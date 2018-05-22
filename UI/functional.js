
"use strict";
var data_handler = (function () {

    var PhotoPosts = [];
    var ArrayAuthor = [];
    var ArrayTags = [];
    function getArrayAuthors() {
        return ArrayAuthor;
    }
    function getArrayTags() {
        return ArrayTags;
    }
    function lengthPhotoPosts() {
        return PhotoPosts.length;
    }
    function getPhotoPosts(skip, top, filterConfig){
        // в фильтре можно выбирать 1 дату, 1 автора , и несколько хэштэгов
        if(!skip)
            skip = 0;
        if(!top)
            top = 10;
        if((typeof top !== "number") || (typeof skip !== "number"))
            return null;
        PhotoPosts.sort(function (a, b) { return a.date - b.date });
        var bufferArray = PhotoPosts.slice(skip,top + skip);
        if(!filterConfig){

            if("date" in filterConfig){
                if(skip >= 0){
                    bufferArray = bufferArray.filter(function (value) {
                        if(filterConfig.date === value.date)
                            return true;
                    });
                }
                else{
                    return null;
                }
            }
            if("author" in filterConfig){
                if(skip >= 0){
                    bufferArray = bufferArray.filter(function (value) {
                        if(filterConfig.author === value.author)
                            return true;
                    });
                }
                else{
                    return null;
                }
            }
            if("hashTags" in filterConfig){// мы проходим по массиву постов а в каждом посте по массиву тэгов и тк мы
                // ищем в посте не один тэг а несколько то мы проходим по массиву тэгов в посте столько раз сколько тэгов ищем
                // (каждый раз перебор тк искомые посты могут быть в любом месте массива)
                if(skip >= 0){
                    bufferArray = bufferArray.filter(function (value) {
                        for(var i = 0; i < filterConfig.hashTags.length; i++){

                            for(var j = 0; j < value.hashTags; j++){
                                if(filterConfig.hashTags[i] === value.hashTags[j])
                                    continue;
                                return false;
                            }
                        }
                        return true;
                    });
                }
                else{
                    return null;
                }
            }
            return bufferArray;
        }
        else{
            if(skip >= 0){
                return PhotoPosts.slice(skip,top + skip);
            }
            else{
                return null;
            }
        }

    }
    function getPost(id) {
        for(var i = 0; i < PhotoPosts.length; i++){
            if(PhotoPosts[i].Id === id){
                return Object.assign({}, PhotoPosts[i]);
            }
        }
    }
    function validatePhotoPost(photoPost) {
        if(!("Id" in photoPost)||(typeof photoPost.Id !== "number")){
            return false;
        }else if(!("Description" in photoPost)||(typeof photoPost.Description !== "string")){
            return false;
        }else if(!("date" in photoPost)||(typeof photoPost.date !== "object")){
            return false;
        }else if(!("author" in photoPost)||(typeof photoPost.author !== "string")){
            return false;
        }else if(!("photoLink" in photoPost)||(typeof photoPost.photoLink !== "string")){
            return false;
        }else if(!("getDate" in photoPost.date)){
            return false;
        }else if(!("hashTags" in photoPost)||(typeof photoPost.hashTags !== "object")){
            return false;
        }else if(!("length" in photoPost.hashTags)){
            return false;
        }else if(!("likes" in photoPost)||(typeof photoPost.likes !== "number")){
            return false;
        }else if(photoPost.length > 7){
            return false;
        }
        else
            return true;
    }
    function addPhotoPost(photoPost) {
        // Функция присваивает новое ID чтобы при добавлении нового поста
        // исключать случай когда посты разные а ID одинаковые
        var test = true;
        for(i = 0; i < PhotoPosts.length; i++){
            if(PhotoPosts[i].Id === photoPost.Id){
                test = false;
                return false;
            }
        }
        if(!(validatePhotoPost(photoPost)) && test){
            return false;
        }else {
            PhotoPosts.push(photoPost);
            var flag = true;
            for(i = 0; i < ArrayAuthor.length; i++){
                if(ArrayAuthor[i] === photoPost.author){
                    flag = false;
                }
            }
            if(flag){
                ArrayAuthor.push(photoPost.author);
            }
            for(var i = 0; i < photoPost.hashTags.length; i++){
                flag = true;
                for(var j = 0; j < ArrayTags.length; j++){
                    if(ArrayTags[j] === photoPost.hashTags[i]){
                        flag = false;
                    }
                }
                if(flag){
                    ArrayTags.push(photoPost.hashTags[i]);
                }
            }
            return true;
        }
    }
    function editPhotoPost(id, photoPost) {
        for(i = 0; i < PhotoPosts.length; i++){
            if(PhotoPosts[i].Id === id){
                var cloneInEdit;
                cloneInEdit = Object.assign({},PhotoPosts[i]);
                for(var key in photoPost){
                    if((key !== "Id")&&(key !== "Description")&&(key !== "date")&&(key !== "author")&&(key !== "photoLink")&&(key !== "hashTags")&&(key !== "likes"))
                        return false;
                }
                for(var k in photoPost){
                    if(k === "photoLink"){
                        cloneInEdit.photoLink = photoPost.photoLink;
                    }
                    if(k === "Description"){
                        cloneInEdit.Description = photoPost.Description;
                    }
                    if(k === "hashTags"){
                        cloneInEdit.hashTags = photoPost.hashTags;
                        var flag = true;
                        for(var i = 0; i < photoPost.hashTags.length; i++){
                            flag = true;
                            for(var j = 0; j < ArrayTags.length; j++){
                                if(ArrayTags[j] === photoPost.hashTags[i]){
                                    flag = false;
                                }
                            }
                            if(flag){
                                ArrayTags.push(photoPost.hashTags[i]);
                            }
                        }
                    }
                }
                if(validatePhotoPost(cloneInEdit)){
                    PhotoPosts[i] = cloneInEdit;
                    return true;
                }else
                    return false;
            }
        }
    }
    function removePhotoPost(id) {
        for(var i = 0; i < PhotoPosts.length; i++){
            if(PhotoPosts[i].Id === id){
                PhotoPosts.splice(i,1);
                return true;
            }
        }
        return false;
    }

    return{
        validatePhotoPost: validatePhotoPost,
        addPhotoPost: addPhotoPost,
        getPhotoPosts: getPhotoPosts,
        getPost: getPost,
        lengthPhotoPosts: lengthPhotoPosts,
        editPhotoPost: editPhotoPost,
        removePhotoPost: removePhotoPost,
        getArrayAuthors:getArrayAuthors,
        getArrayTags:getArrayTags
    };
})();
var test = {
    Id: 1,
    Description:"test 1",
    date: new Date(2000,1,3,4,54,2),
    author:"Cyril",
    photoLink: "img2.png",
    hashTags:["#cooooool","#Ilove","#ice"],
    likes:0
};
var test2 = {
    Id: 2,
    Description:"test2",
    date: new Date(2010,2,3,4),
    author:"Mike",
    photoLink: "logo.png",
    hashTags:["tag1","tag2"],
    likes:0
};
console.log(" add test1: " + data_handler.addPhotoPost(test));
console.log(" add test2: " + data_handler.addPhotoPost(test2));
console.log(data_handler.addPhotoPost({Id:3,photoLink:"img2.png",Description:"testAdd",date: new Date(2013,5,6,13),author:"Joe",hashTags:["#super","#goood","#nice"],likes:0}));
console.log("length: " + data_handler.lengthPhotoPosts());
console.log("list of photoposts: " + data_handler.getPhotoPosts(0,10,{}).length);


