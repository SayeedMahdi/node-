

const p=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        //resolve(2);
        reject(new Error("error happend."));
    },2000);
});
p.then(c=>{ console.log(c)})
    .catch(err=>{console.log(err.message)});


    //work with github commit and repository


function getusername(id){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("reading from git hup api");
            resolve({id:id,githubusername: "Mahdi"});
        },2000);
    });
}
//githup repository

function getrepostory(username){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("calling githup repository...");
            resolve({githubrepo: ["Motor bike","html","node"]});
        },2000);
    });
}
//git commit
function getcommits(repo){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("calling githup commit api...");
            resolve({commit: ["commit"]});
        },2000);
    });
}
async function Promisef(){
    try{
    const user=await getusername(1);
    const repo=await getrepostory(user);
    const commit=await getcommits(repo[0]);
    console.log(commit);
}catch(err){
    console.log(err.message);
}
}
Promisef();