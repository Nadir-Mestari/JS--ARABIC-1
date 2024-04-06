let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let dicsovers = document.getElementById("dicsovers");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let deletALL = document.getElementById("deletALL");

let mod = "create";
let x;

function Tot() {
    if (price.value != "") {
        let result = +price.value + +taxes.value + +ads.value - +dicsovers.value;
        console.log(result);

        total.innerText = result;

        total.style.background = "green";
    } else {
        total.style.background = "rgb(214, 51, 51)";
        total.innerText = "";
    }
}

let data;
if (localStorage.donnes != null) {
    data = JSON.parse(localStorage.donnes);


} else {
    data = [];
}

submit.onclick = () => {
    let object = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        dicsovers: dicsovers.value,
        total: total.innerText,
        count: count.value,
        category: category.value,
    };
    if (title.value != "" && price.value != "" && taxes.value != "" && ads.value != "" && dicsovers.value != "" && category.value != "" && count.value < 100) {

        if (mod === "create") {

            if (object.count > 1) {
                for (let j = 0; j < count.value; j++) {
                    data.push(object);

                }
            } else {
                data.push(object);

            }
        } else {
            data[x] = object
            count.style.display = "block"
            mod = "create"
            submit.textContent = "Creat"




        }
        title.classList.remove("placehold")
        price.classList.remove("placehold")
        taxes.classList.remove("placehold")
        ads.classList.remove("placehold")
        dicsovers.classList.remove("placehold")
        category.classList.remove("placehold")
        if (count.value < 100) {
            count.classList.remove("placehold")
            count.style.color = "whitesmoke"
        }
        clear();
    } else {
        title.classList.add("placehold")
        price.classList.add("placehold")
        taxes.classList.add("placehold")
        ads.classList.add("placehold")
        dicsovers.classList.add("placehold")
        category.classList.add("placehold")
        if (count.value > 100) {
            count.style.color = "red"

        }


    }
    localStorage.donnes = JSON.stringify(data);


    show();


};

const clear = () => {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    dicsovers.value = "";
    total.innerText = "";
    count.value = "";
    category.value = "";
    total.style.background = "rgb(214, 51, 51)";
};

function show() {
    let table = '';
    for (let i = 0; i < data.length; i++) {

        table += `
    
       <tr>
       <td>${i + 1}</td>
       <td>${data[i].title}</td>
       <td>${data[i].price}</td>
       <td>${data[i].taxes}</td>
       <td>${data[i].ads}</td>
       <td>${data[i].dicsovers}</td>
       <td>${data[i].total}</td>
       <td>${data[i].category}</td>
       <td><button onclick=" updatt(${i} ) "id="update">update</button></td>
       <td><button onclick=" delet( ${i} ) " id="delet">delet</button></td>
        
       </tr>
`
        document.getElementById("tbody").innerHTML = table;
        if (table.length > null) {
            deletALL.innerHTML = `
            <button onclick="deletall()">Delet All ${data.length}</button>
            
            `
        } else {
            deletALL.innerHTML = "";
        }

    }




}

show();


let deletall = function () {
    localStorage.clear()

    data.splice(0)
    show();
}

const delet = (i) => {
    data.splice(i, 1);
    localStorage.donnes = JSON.stringify(data);
    show();
}



function updatt(i) {
    title.value = data[i].title
    price.value = data[i].price
    taxes.value = data[i].taxes
    ads.value = data[i].ads
    dicsovers.value = data[i].dicsovers
    Tot()
    count.style.display = "none"
    submit.textContent = "Update"
    category.value = data[i].category
    mod = "update";
    x = i;
    scroll({
        top: 0,
        behavior: "smooth",

    })

}


let search = "title";

const GetSearchMod = (y) => {

    let searchTC = document.getElementById("search")

    if (y === "btnSearchTitle") {
        search = "Title"

    } else {
        search = "Category"

    }
    searchTC.placeholder = "search by " + search
    searchTC.focus()
    searchTC.value = "";
    show();

    console.log(search)
}


function SearchMod(value) {


    let table = '';
    for (let i = 0; i < data.length; i++) {
        if (search == "title") {


            if (data[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `
    
                <tr>
                <td>${i + 1}</td>
                <td>${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].dicsovers}</td>
                <td>${data[i].total}</td>
                <td>${data[i].category}</td>
                <td><button onclick=" updatt(${i} ) "id="update">update</button></td>
                <td><button onclick=" delet( ${i} ) " id="delet">delet</button></td>
                 
                </tr>
         `
            }










        } else {


            if (data[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += `
    
                <tr>
                <td>${i + 1}</td>
                <td>${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].dicsovers}</td>
                <td>${data[i].total}</td>
                <td>${data[i].category}</td>
                <td><button onclick=" updatt(${i} ) "id="update">update</button></td>
                <td><button onclick=" delet( ${i} ) " id="delet">delet</button></td>
                 
                </tr>
         `
            }



        }









    }
    document.getElementById("tbody").innerHTML = table;
}































