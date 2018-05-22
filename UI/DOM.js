"use strict";
/*
* <div>
    <div>
        <img>
        <div>
            <span></span>//tag mobile
            <span></span>//tag mobile
            <span></span>//tag mobile
        </div>
        <button></button>
        <div>//nickname
            <div></div>//mobile data
        </div>
    </div>
    <div>
        <div>
            <div></div>//data
            <div>
                <div></div>//tag
                <div></div>//tag
                <div></div>//tag
                <div></div>//tag
            </div>
            <div>
                <div></div>//description
            </div>
        </div>
    </div>
 </div>*/

/*
*   <p><input type="checkbox">
    <label>NameMax</label></p>
    <p><input type="checkbox">
    <label>Name1</label></p>
    <p><input type="checkbox">
    <label>Name1</label></p>
    <button class="more">next ></button>*/
var DOM_handler = (function () {
    var user = null;
    function logIn(name) {
        user = name;
        var ed = document.getElementsByClassName("button-edit");
        var remove = document.getElementsByClassName("button-remove");
        var nick = document.getElementsByClassName("nickname");
        for(var i = 0; i < remove.length; i++){
            if(nick[i].firstChild.textContent === name){
                remove[i].style.display = "block";
                ed[i].style.display = "block";
            }
        }
        var l = document.getElementsByClassName("wrap-button-sign-in");
        l[0].firstElementChild.textContent = name;
        l[0].lastElementChild.textContent = "Exit";
    }
    function logOut() {
        if(user !== null){
            var ed = document.getElementsByClassName("button-edit");
            var remove = document.getElementsByClassName("button-remove");
            for(var i = 0; i < remove.length; i++){
                remove[i].style.display = "";
                ed[i].style.display = "";
            }
            var l = document.getElementsByClassName("wrap-button-sign-in");
            l[0].firstElementChild.textContent = "";
            l[0].lastElementChild.textContent = " Sign in";
        }
    }
    function displayFilterAuthorDOM(num) {
        if((num - 1) * 3 + 2 > data_handler.getArrayAuthors().length || (num - 1) * 3 + 2 < 0)
            return false;
        var unit = document.createElement("p");
        unit.innerHTML = "<input type=\"checkbox\">\n" +
            "    <label></label>";
        var filter = document.getElementsByClassName("authors");
        filter[0].innerHTML = "";
        if(data_handler.getArrayAuthors().length === 1){
            filter[0].appendChild(unit);
            filter[0].getElementsByTagName("label")[0].textContent = data_handler.getArrayAuthors()[(num - 1) * 3 + 0];
        }else if(data_handler.getArrayAuthors().length === 2){
            filter[0].appendChild(unit.cloneNode(true));
            filter[0].appendChild(unit);
            console.log(data_handler.getArrayAuthors().length);
            filter[0].getElementsByTagName("label")[0].textContent = data_handler.getArrayAuthors()[(num - 1) * 3 + 0];
            filter[0].getElementsByTagName("label")[1].textContent = data_handler.getArrayAuthors()[(num - 1) * 3 + 1];
        }else{
            console.log("ArrayAuthors " + data_handler.getArrayAuthors()[2]);
            filter[0].appendChild(unit.cloneNode(true));
            filter[0].appendChild(unit.cloneNode(true));
            filter[0].appendChild(unit.cloneNode(true));
            filter[0].getElementsByTagName("label")[0].textContent = data_handler.getArrayAuthors()[(num - 1) * 3 + 0];
            filter[0].getElementsByTagName("label")[1].textContent = data_handler.getArrayAuthors()[(num - 1) * 3 + 1];
            filter[0].getElementsByTagName("label")[2].textContent = data_handler.getArrayAuthors()[(num - 1) * 3 + 2];
        }
        filter[0].appendChild(document.createElement("button"));
        filter[0].lastElementChild.setAttribute("class","more");
        filter[0].lastElementChild.textContent = "next > ";
        return true;

    }
    function displayFilterTagsDOM(num) {
        if((num - 1) * 3 + 2 > data_handler.getArrayTags().length || (num - 1) * 3 + 2 < 0)
            return false;
        var unit = document.createElement("p");
        unit.innerHTML = "<input type=\"checkbox\">\n" +
            "    <label></label>";
        var filter = document.getElementsByClassName("tags");
        filter[0].innerHTML = "";
        if(data_handler.getArrayTags().length === 1){
            filter[0].appendChild(unit);
            filter[0].getElementsByTagName("label")[0].textContent = data_handler.getArrayTags()[(num - 1) * 3 + 0];
        }else if(data_handler.getArrayAuthors().length === 2){
            filter[0].appendChild(unit.cloneNode(true));
            filter[0].appendChild(unit);
            console.log(data_handler.getArrayAuthors().length);
            filter[0].getElementsByTagName("label")[0].textContent = data_handler.getArrayTags()[(num - 1) * 3 + 0];
            filter[0].getElementsByTagName("label")[1].textContent = data_handler.getArrayTags()[(num - 1) * 3 + 1];
        }else{
            filter[0].appendChild(unit.cloneNode(true));
            filter[0].appendChild(unit.cloneNode(true));
            filter[0].appendChild(unit.cloneNode(true));
            filter[0].getElementsByTagName("label")[0].textContent = data_handler.getArrayTags()[(num - 1) * 3 + 0];
            filter[0].getElementsByTagName("label")[1].textContent = data_handler.getArrayTags()[(num - 1) * 3 + 1];
            filter[0].getElementsByTagName("label")[2].textContent = data_handler.getArrayTags()[(num - 1) * 3 + 2];
        }
        filter[0].appendChild(document.createElement("button"));
        filter[0].lastElementChild.setAttribute("class","more");
        filter[0].lastElementChild.textContent = "next > ";
        return true;
    }
    function createPostInDOM2(photoPost){
        var pointer;
        var set_attributes;
        var div = document.createElement("div");
        var span = document.createElement("span");
        var Post = div.cloneNode(true);
        for(var i = 0; i < 2; i++){
            Post.appendChild(div.cloneNode(true));
        }
        pointer = Post.firstElementChild;
        set_attributes = pointer;
        pointer.appendChild(document.createElement("img"));
        pointer.appendChild(div.cloneNode(true));
        pointer = pointer.children[1];
        for(i = 0; i < 3; i++){
            pointer.appendChild(span.cloneNode(true));
            if(i === 0){
                pointer.lastElementChild.textContent = "more";
            }
            else{
                if(photoPost.hashTags[i] === undefined){
                    pointer.lastElementChild.textContent = "01";
                    continue;
                }
                pointer.lastElementChild.textContent = photoPost.hashTags[i];
            }
        }
        pointer = pointer.parentElement;
        pointer.appendChild(document.createElement("button"));
        pointer.lastElementChild.textContent = "Like";
        pointer.appendChild(document.createElement("button"));
        pointer.lastElementChild.textContent = "Remove";
        pointer.appendChild(document.createElement("button"));
        pointer.lastElementChild.textContent = "Edit";
        pointer.appendChild(div.cloneNode(true));
        pointer.lastElementChild.textContent = photoPost.author;
        pointer.lastElementChild.appendChild(div.cloneNode(true));
        pointer.lastElementChild.firstElementChild.textContent = photoPost.date.getDay() + "/" +
            photoPost.date.getMonth() + "/" + photoPost.date.getFullYear();
        //mobile data
        pointer = Post.lastElementChild;
        pointer.appendChild(div.cloneNode(true));
        pointer = pointer.firstElementChild;
        for(i = 0; i < 3; i++){
            pointer.appendChild(div.cloneNode(true));
            //for 0 data
            if(i === 0){
                pointer.lastElementChild.textContent = photoPost.date.getDay() + "/" +
                    photoPost.date.getMonth() + "/" + photoPost.date.getFullYear();
            }
        }
        pointer = pointer.children[1];
        for(i = 0; i < 4; i++){
            pointer.appendChild(div.cloneNode(true));
            //for 0-2 tags
            if(i === 3){
                pointer.lastElementChild.textContent = "more";
            }
            else{
                if(photoPost.hashTags[i] === undefined){
                    pointer.lastElementChild.textContent = "01";
                    continue;
                }
                pointer.lastElementChild.textContent = photoPost.hashTags[i];
            }
        }
        pointer = pointer.nextElementSibling;
        pointer.appendChild(div.cloneNode(true));
        pointer.firstElementChild.textContent = photoPost.Description;

        Post.setAttribute("class","post");
        set_attributes.setAttribute("class","post-img-wrap");
        set_attributes = set_attributes.firstElementChild;
        set_attributes.setAttribute("class","post-img");
        set_attributes.setAttribute("src",photoPost.photoLink);
        set_attributes = set_attributes.nextElementSibling;
        set_attributes.setAttribute("class","post-tag-mobile");
        for(i = 0; i < 3; i++){
            if(set_attributes.children[i].textContent === "01"){
                set_attributes.removeChild(set_attributes.children[i]);
                continue;
            }
            if(i === 0)
                set_attributes.children[i].setAttribute("class","post-tag-more");
            else
                set_attributes.children[i].setAttribute("class","post-tags");
        }
        set_attributes = set_attributes.nextElementSibling;
        set_attributes.setAttribute("class","button-like");
        set_attributes = set_attributes.nextElementSibling;
        set_attributes.setAttribute("class","button-remove");
        set_attributes = set_attributes.nextElementSibling;
        set_attributes.setAttribute("class","button-edit");
        set_attributes = set_attributes.nextElementSibling;
        set_attributes.setAttribute("class","nickname");
        set_attributes.firstElementChild.setAttribute("class","date-tag-mobile");
        set_attributes = set_attributes.parentElement;
        set_attributes = set_attributes.nextElementSibling;
        set_attributes.setAttribute("class","info-post");
        set_attributes = set_attributes.firstElementChild;
        set_attributes.setAttribute("class","info-post-table");
        set_attributes = set_attributes.firstElementChild;
        set_attributes.setAttribute("class","info-post-date");
        set_attributes = set_attributes.nextElementSibling;
        set_attributes.setAttribute("class","info-post-tags");
        var count = 0;
        for(i = 0; i < 3; i++){
            if(set_attributes.children[i].textContent === "01"){
                count ++;
                set_attributes.removeChild(set_attributes.children[i]);
                continue;
            }
            set_attributes.children[i].setAttribute("class","post-tags");
        }
        set_attributes.children[3 - count].setAttribute("class","post-tag-more");
        set_attributes = set_attributes.nextElementSibling;
        set_attributes.setAttribute("class","info-post-description");
        set_attributes.firstElementChild.setAttribute("class","post-description");
        return Post;
    }
    function displayPhotoPosts(page, filterConfig) {
        // page - номер 10 постов которые отображаются на странице
        // например если page = 1 отображает первые 10 постов
        var arrayFilterPosts;
        var parentElements = document.getElementsByClassName("post-panel-align");
        parentElements[0].innerHTML = "";
        parentElements[1].innerHTML = "";
        if(page > data_handler.lengthPhotoPosts()/10 + 1){
            return false;
        }
        if(page === 1 && data_handler.lengthPhotoPosts() > 0){
            arrayFilterPosts = data_handler.getPhotoPosts(0,10,filterConfig);
            for(var i = 0; i < arrayFilterPosts.length; i++){
                if(i === 0 || i % 2 === 0){
                    parentElements[0].appendChild(createPostInDOM2(arrayFilterPosts[i]));
                }
                else{
                    parentElements[1].appendChild(createPostInDOM2(arrayFilterPosts[i]));
                }
            }
            return true;
        }else {
            arrayFilterPosts = data_handler.getPhotoPosts((page - 1) * 10,10,filterConfig);
            for(i = 0; i < arrayFilterPosts.length; i++){
                if(i === 0 || i % 2 === 0){
                    parentElements[0].appendChild(createPostInDOM2(arrayFilterPosts[i]));
                }
                else{
                    parentElements[1].appendChild(createPostInDOM2(arrayFilterPosts[i]));
                }
            }
            return true;
        }
    }
    function addPostDOM(photoPost) {
        data_handler.addPhotoPost(photoPost);
        displayPhotoPosts(1,{});
    }
    function removePostDOM(id) {
        data_handler.removePhotoPost(id);
        displayPhotoPosts(1,{});
    }
    function editPostDOM(id,PhotoPost){
        data_handler.editPhotoPost(id,PhotoPost);
        displayPhotoPosts(1,{});
    }
    return{
        displayPhotoPosts: displayPhotoPosts,
        addPostDOM:addPostDOM,
        removePostDOM:removePostDOM,
        editPostDOM:editPostDOM,
        logIn:logIn,
        logOut:logOut,
        displayFilterAuthorDOM:displayFilterAuthorDOM,
        displayFilterTagsDOM:displayFilterTagsDOM
    }
})();
DOM_handler.displayPhotoPosts(1,{});
DOM_handler.displayFilterAuthorDOM(1);
DOM_handler.displayFilterTagsDOM(1);