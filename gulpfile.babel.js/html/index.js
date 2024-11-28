const {src, dest} = require('gulp');
const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');
const util = require('util');
const newer = require('gulp-newer');
const htmlhint = require('gulp-htmlhint');
const ejs = require('gulp-ejs');
const beautify = require('gulp-jsbeautifier');
const config = require('../../config.json');

const setHTML = () => 
  src([config.htmlSetting.src, '!' + config.htmlSetting.except])
  .pipe(newer(config.htmlSetting.dist))
  .pipe(ejs())
  .pipe(htmlhint('templates/htmlhint.json'))
  .pipe(htmlhint.reporter())
  .pipe(beautify({
      config: '.jsbeautifyrc',
      mode: 'VERIFY_AND_WRITE'
  }))
  .pipe(dest(config.dir.dist))

const generateHTML = (done) => {
  let dirPath='dist/views/';
  let pathArr = fs.readdirSync(dirPath);
  let dirPathArr=[];

  pathArr.forEach(path=>{
      dirPathArr.push('dist/views/' + path);
      console.log('Path배열 : ' + dirPathArr);
  });

  let fileObjArr=[],
      categories=[],
      projectObj={},
      projectObjStr,
      projectObjJson; 
  
  let projectJson = fs.readFileSync('templates/projectInfo.json', 'utf-8'),
      projectInfo = {};
      projectInfo.projectName =JSON.parse(projectJson).project_name;
      projectInfo.projectAuthor =JSON.parse(projectJson).author;
      projectInfo.projectOrg = JSON.parse(projectJson).organization;

  dirPathArr.forEach((pathname, idx)=>{
    fs.readdir(pathname, function(err, files) {
      if (err) {
        throw err;
      }
      files.map(function(file) {
        return path.join(pathname, file);
      }).filter(function(file) {
        return fs.statSync(file).isFile();
      }).filter(function(file){ 
        let extname = path.extname(file);
        if (extname == '.html'){
          return fs.statSync(file);
        }
      }).forEach(function(file){
        let fileInnerText,
          wholeTitle,
          splitTitle,
          fileData,
          pageStatus,
          splitStatus;
        let stats = fs.statSync(file);
        if (file.match(pathArr[idx])){
          fileData = {};
          fileInnerText = fs.readFileSync(file, 'utf8');
          let $ = cheerio.load(fileInnerText);
            wholeTitle = ($('meta[name="list"]').length !== 0) ? $('meta[name="list"]').attr('content') : $('title').text();
            splitTitle = wholeTitle.split(' : ');
          if ($('body').data('pagestatus')) {
            pageStatus = $('body').data('pagestatus');
            splitStatus = pageStatus.split(' : ');
            fileData.splitStatus = splitStatus[0];
            fileData.splitStatusDate = splitStatus[1];
          }
          fileData.title = splitTitle[0];
          fileData.name = path.basename(file);
          fileData.category = String(fileData.name).substring(0, 2);
          fileData.categoryText = splitTitle[1];
          fileData.listTitle = wholeTitle;
          fileData.mdate = new Date(util.inspect(stats.mtime));

          if(fileObjArr[idx]==undefined){
            fileObjArr[idx]=[];
            fileObjArr[idx].push({theme:pathArr[idx]});
          }
          fileObjArr[idx].push(fileData);
          if (!categories.includes(fileData.category)) {
            categories.push(fileData.category);
          }
          if ($('meta[name="list"]').length !== 0) {
            $('meta[name="list"]').remove();
            fs.writeFileSync(file, $.html({
              decodeEntities: false
            }), function(err) {
              if (err) throw err;
            });
          }
        }
      })
      if(idx===dirPathArr.length-1){
        projectObj.project = projectInfo;
        projectObj.files=fileObjArr;
        projectObjStr = JSON.stringify(projectObj);
        projectObjJson = JSON.parse(projectObjStr);
        src("templates/@index.html")
        .pipe(ejs(projectObjJson))
        .pipe(dest("dist/"))
        done();
      }
    });
  });
}
module.exports={
    setHTML,
    generateHTML,
}