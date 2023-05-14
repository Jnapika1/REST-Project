myForm = document.getElementById('form1');
sellingPrice = document.getElementById('sp');
prodName=document.getElementById('pname');
addProd = document.getElementById('submit');
ul=document.getElementById('list-group')
total=document.getElementById('sum');

let sum = 0;

window.addEventListener('DOMContentLoaded', async function () {
    try{
        let response = await axios.get('https://crudcrud.com/api/2c230af9d14f4b65be52d100c3ca8319/products')
                for (let i = 0; i < response.data.length; i++) {
                    showObjOnScreen(response.data[i], response.data[i].sp);
                }
    }    
    
    catch(err) 
    {
        console.log(err);
    }
    })

myForm.addEventListener('submit', onSubmit);

async function onSubmit(e){
    e.preventDefault();
    if(sellingPrice.value==='' || prodName.value===''){
        alert('Enter the details!');
    }
    else{
        let myObj = {
            sp:sellingPrice.value,
            pname:prodName.value,
        }
        try{
            let response= await axios.post('https://crudcrud.com/api/2c230af9d14f4b65be52d100c3ca8319/products', myObj)
            
            showObjOnScreen(response.data, response.data.sp);
        }
        
            // console.log(response)
        catch(err){
        console.log(err);
        }
    }
}

function showObjOnScreen(obj, sp){
    
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(`${obj.pname}`));
    li.appendChild(document.createTextNode(` - ${obj.sp}`));
    ul.appendChild(li);

    sum=sum+parseInt(sp);
    total.value=sum;

    let del = document.createElement('button');
    del.type="button"
    del.className="btn btn-danger btn-sm float-right delete";
    del.appendChild(document.createTextNode("delete"));
    li.appendChild(del);
}

ul.addEventListener('click', deleteItem);

async function deleteItem(e){
    if(e.target.classList.contains('delete')){
        let user = e.target.parentElement;
        ul.removeChild(user);
        try{
            let response = await axios.get('https://crudcrud.com/api/2c230af9d14f4b65be52d100c3ca8319/products')
            for(let i=0;i<response.data.length;i++){
                if(response.data[i].pname===user.firstChild.textContent){
                    sum=sum-parseInt(response.data[i].sp);
                    total.value=sum;
                    await axios.delete(`https://crudcrud.com/api/2c230af9d14f4b65be52d100c3ca8319/products/${response.data[i]._id}`)
                    // .catch(err=>console.log(err));
                }
            }
        }
        catch(err){
            console.log(err);
        }
        
    }
}