import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Page } from '@domain/entities/page';
import { pageModel, mongoosePageModel } from '@infrastructure/models/page.model';
import { PageDto } from '@application/dto/page.dto';
import { testimonyDto } from '@application/dto/testimony.dto';
import { PAGE_MODEL_PROVIDER } from '@constants';
import { FileInterceptor } from '@nestjs/platform-express';
import {existsSync, mkdirSync, writeFileSync} from 'fs';
import { randomBytes } from 'crypto';
import { join } from 'path';
import { copySync }  from 'fs-extra';
import { exec, pwd } from 'shelljs';
import * as rimraf from 'rimraf';


// Se inyecta el repo en el servicio
@Injectable()
export class PageRepository {

  constructor(@Inject(PAGE_MODEL_PROVIDER) private readonly model: Page) {}

  async create(page: PageDto): Promise<Page> {

    //genero los modelos de los usuarios
    let myPage = new pageModel(page);
    let pageFind = await mongoosePageModel.findOne({ $or:[  {'name':page.name}, {'phoneNumber':page.phoneNumber},{'email':page.email} ]}).exec();
    let finalPage = (pageFind)? pageFind: myPage;

    if(pageFind){
      finalPage.testimonies.push(myPage.testimonies[0]);
      finalPage.name = myPage.name;
      finalPage.biografy = myPage.biografy;
      finalPage.phoneNumber = myPage.phoneNumber;
      finalPage.email = myPage.email;
      finalPage.log = myPage.log;
      finalPage.video = myPage.video;
    }

    
    try{
      mongoosePageModel.findOneAndUpdate({ $or:[  {'name':page.name}, {'phoneNumber':page.phoneNumber},{'email':page.email}]}, finalPage, {upsert: true, setDefaultsOnInsert: true}, function(error, result) {
        if (error) return;
      });
    }
    catch (error) {
      console.log(error.message);
    }  

    

    return await myPage;
  }

  async find(): Promise<Page[]> {
    return await mongoosePageModel.find().exec();
  }

  async build(file, pageDto:PageDto){
    const dir = './tmp';
        const slug = pageDto.name;
        const subdomain = slug + '.example.com'
        const tempdir = join(dir, slug);
        if (!existsSync(tempdir)){
            mkdirSync(tempdir);
        }
        const imgdir = join(tempdir, 'img');
        if (!existsSync(imgdir)){
            mkdirSync(imgdir);
        }
        // save file
        writeFileSync(join(tempdir, 'img', file.originalname), file.buffer);
        const datadir = join(tempdir, '_data');
        if (!existsSync(datadir)){
            mkdirSync(datadir);
        }
        // save data
        let data = JSON.stringify({
            title: pageDto.name,
            images: [file.originalname]
        });
        writeFileSync(join(datadir, 'site.json'), data);
        // copy the template
        copySync('./template', tempdir);
        //
        const outputdir = join(tempdir, '_site');
        if (!existsSync(outputdir)){
            mkdirSync(outputdir);
        }
        const wd = pwd().stdout
        const commanddir = join(wd, 'node_modules/.bin/');
        var generation = exec(`${commanddir}eleventy --input=${tempdir} --output=${dir}/${slug}/_site --formats=hbs,html,jpg,gif,png`).stdout;
        // NB: (in windows) the command needs fullpath the input/output relative paths to cwd
        // copy output on a running container of nginx
        let copying = exec(`docker cp ${dir}/${slug}/_site/. webserver:/usr/share/nginx/html/${subdomain}`).stdout;
        // copy new config file
        const config = 
        `server {
            listen 80;
            listen [::]:80;
    
            root /usr/share/nginx/html/${subdomain};
            index index.html index.htm index.nginx-debian.html;
    
            server_name ${subdomain} www.${subdomain};
    
            location / {
                    try_files $uri $uri/ =404;
            }
        }
        `
        writeFileSync(`${dir}/${slug}/${subdomain}.conf`, config);
        copying = exec(`docker cp ${dir}/${slug}/${subdomain}.conf webserver:/etc/nginx/conf.d/${subdomain}.conf`).stdout;
        console.log({copying})
        // restart nginx
        const restarting = exec(`docker container exec webserver nginx -s reload`).stdout;
        console.log({restarting})
        // remove temp dir
        //rimraf.sync(tempdir);
  }

}
