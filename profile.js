let input = document.getElementById("input");
let uploadImage = document.getElementById("uploadImage");
let button = document.getElementById("btn");

input.addEventListener("change", ()=>{
console.log(input.files)

    uploadImage.src=URL.createObjectURL(input.files[0])
})


