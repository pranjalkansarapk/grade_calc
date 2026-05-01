const questions = [
  {name:"Maths",c:4,m:95},
  {name:"Physics",c:3,m:85},
  {name:"Chemistry",c:3,m:75},
  {name:"CS",c:4,m:88},
  {name:"English",c:2,m:70},
  {name:"Workshop",c:2,m:60}
];

function grade(m){
  if(m>=90) return ['O',10];
  if(m>=80) return ['A+',9];
  if(m>=70) return ['A',8];
  if(m>=60) return ['B+',7];
  if(m>=50) return ['B',6];
  if(m>=40) return ['C',5];
  return ['F',0];
}

function render(){
  let tb=document.getElementById('tableBody');
  tb.innerHTML='';

  let total=0, credits=0;

  subjects.forEach((s,i)=>{
    let [g,p]=grade(s.m);
    total+=p*s.c;
    credits+=s.c;

    let row=`<tr>
      <td>${s.name}</td>
      <td>${s.c}</td>
      <td>${s.m}</td>
      <td>${g}</td>
      <td>${p}</td>
      <td><button onclick="del(${i})">X</button></td>
    </tr>`;

    tb.innerHTML+=row;
  });

  let sgpa=(total/credits).toFixed(2);
  document.getElementById('sgpa').innerText=sgpa;

  localStorage.setItem('subs',JSON.stringify(subjects));
}

function addSubject(){
  let n=subName.value;
  let c=+credits.value;
  let m=+marks.value;
  subjects.push({name:n,c,m});
  render();
}

function del(i){ subjects.splice(i,1); render(); }

let cgpas=[];
function addCGPA(){
  cgpas.push(+prevSGPA.value);
  let avg=cgpas.reduce((a,b)=>a+b,0)/cgpas.length;
  document.getElementById('cgpa').innerText=avg.toFixed(2);
}

function exportData(){
  let text="Grade Report\n";
  subjects.forEach(s=>text+=`${s.name} ${s.m}\n`);
  let blob=new Blob([text]);
  let a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download="report.txt";
  a.click();
}

render();

