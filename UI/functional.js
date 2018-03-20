
"use strict";
var js = (function () {

    var PhotoPosts = [];
    function lengthPhotoPosts() {
        return PhotoPosts.length;
    }
    function getPhotoPosts(skip, top, filterConfig){
        if(!skip)
            skip = 0;
        if(!top)
            top = 10;
        PhotoPosts.sort(function (a, b) { return a.date - b.date });
        if(filterConfig !== undefined){
            if("date" in filterConfig){
                if(skip > 0){
                    var bufferArray = PhotoPosts.slice(skip,top + skip);
                    return bufferArray.filter(function (value) {
                        if(filterConfig.date === value.date)
                            return true;
                    });
                }else if(skip < 0){
                    return null;
                }else{
                    var bufferArray = PhotoPosts.slice(skip,top);
                    return bufferArray.filter(function (value) {
                        if(filterConfig.date.getTime() === value.date.getTime())
                            return true;
                    });
                }
            }
            if("author" in filterConfig){
                if(skip > 0){
                    var bufferArray = PhotoPosts.slice(skip,top + skip);
                    return bufferArray.filter(function (value) {
                        if(filterConfig.author === value.author)
                            return true;
                    });
                }else if(skip < 0){
                    return null;
                }
                else{
                    var bufferArray = PhotoPosts.slice(skip,top);
                    return bufferArray.filter(function (value) {
                        if(filterConfig.author === value.author)
                            return true;
                    });
                }

            }
            if("hashTags" in filterConfig){
                if(skip > 0){
                    var bufferArray = PhotoPosts.slice(skip,top + skip);
                    return bufferArray.filter(function (value) {
                        for(var i = 0; i < PhotoPosts.length; i++){
                            for(var j = 0; j < PhotoPosts.length; j++){
                                if(filterConfig.hashTags[i] != value.hashTags[j])
                                    return false;
                            }
                        }
                        return true;
                    });
                }else if(skip < 0){
                    return null;
                }else{
                    var bufferArray = PhotoPosts.slice(skip,top);
                    return bufferArray.filter(function (value) {
                        var flag;
                        for(var i = 0; i < filterConfig.hashTags.length; i++){
                            flag = false;
                            for(var j = 0; j < value.hashTags.length; j++){
                                if((filterConfig.hashTags[i] === value.hashTags[j])){
                                    flag = true;
                                    break;
                                }
                            }
                            if(!flag)
                                return false;
                        }
                        return true;
                    });
                }
            }
        }
        else{
            if(skip > 0){
                return PhotoPosts.slice(skip,top + skip);
            }else if(skip < 0){
                return null;
            }else{
                return PhotoPosts.slice(skip,top);
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
        }else if(!("likes" in photoPost)||(typeof photoPost.likes !== "object")){
            return false;
        }else if(!("length" in photoPost.likes)){
            return false;
        }else if(photoPost.length > 7){
            return false;
        }
        else
            return true;
    }
    function addPhotoPost(photoPost) {
        if(!(validatePhotoPost(photoPost))){
            return false;
        }else {
            for(var i = 0; i < PhotoPosts.length; i++){
                if(PhotoPosts[i].Id === photoPost.Id)
                    return false;
            }
            PhotoPosts.push(photoPost);
            return true;
        }
    }
    function editPhotoPost(id, photoPost) {
        for(var i = 0; i < PhotoPosts.length; i++){
            if(PhotoPosts[i].Id === id){
                var cloneInEdit = {};
                Object.assign(cloneInEdit,PhotoPosts[i]);
                for(var key in photoPost){
                    if((key !== "Id")&&(key !== "Description")&&(key !== "date")&&(key !== "author")&&(key !== "photoLink")&&(key !== "hashTags")&&(key !== "likes"))
                        return false;
                }
                for(key in photoPost){
                    if(key === "photoLink"){
                        cloneInEdit.photoLink = photoPost.photoLink;
                    }
                    if(key === "Description"){
                        cloneInEdit.Description = photoPost.Description;
                    }
                    if(key === "hashTags"){
                        cloneInEdit.hashTags = photoPost.hashTags;
                    }
                    if(validatePhotoPost(cloneInEdit)){
                        PhotoPosts[i] = cloneInEdit;
                        return true;
                    }else
                        return false;
                }
            }
        }
    }
    function removePhotoPost(id) {
        for(var i = 0; i < PhotoPosts.length; i++){
            if(PhotoPosts[i].Id === id){
                PhotoPosts.splice(i,1);
                displayPhotoPosts(1);
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
        removePhotoPost: removePhotoPost
    };
})();
var test = {
    Id: 1,
    Description:"test 1",
    date: new Date(2000,1,3,4,54,2),
    author:"Cyril",
    photoLink: "img2.png",
    hashTags:["#cooooool","#Ilove","#ice"],
    likes:[" "]
};
var test2 = {
    Id: 2,
    Description:"test2",
    date: new Date(2010,2,3,4),
    author:"Mike",
    photoLink: "logo.png",
    hashTags:["tag1","tag2"],
    likes:[]
};
console.log(" add test1: " + js.addPhotoPost(test));
console.log(" add test2: " + js.addPhotoPost(test2));
js.addPhotoPost({Id:3,photoLink:"img2.png",Description:"testAdd",date: new Date(2013,5,6,13),author:"Joe",hashTags:["#super","#goood","#nice"],likes:[]});
console.log("list of photoposts: " + js.getPhotoPosts(1,10).length);


