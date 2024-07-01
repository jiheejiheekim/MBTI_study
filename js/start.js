const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 12;
//const select = []; 알고리즘을 간단히 하기 위해 아래 형태로 변경
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//qIdx : 질문지 인덱스 번호
//idx : 사용자가 선택한 선택지 인덱스 번호
//type : mouse, cow, tiger ..



function calResult(){
    /* 알고리즘을 간단히 하기 위해 주석처리
    //결과를 더할 배열
    var pointArray = [
        { name: 'mouse', value: 0, key: 0 },
        { name: 'cow', value: 0, key: 1 },
        { name: 'tiger', value: 0, key: 2 },
        { name: 'rabbit', value: 0, key: 3 },
        { name: 'dragon', value: 0, key: 4 },
        { name: 'snake', value: 0, key: 5 },
        { name: 'horse', value: 0, key: 6 },
        { name: 'sheep', value: 0, key: 7 },
        { name: 'monkey', value: 0, key: 8 },
        { name: 'chick', value: 0, key: 9 },
        { name: 'dog', value: 0, key: 10 },
        { name: 'pig', value: 0, key: 11 },
    ]

    for(let i = 0; i<endPoint; i++){
        var target = qnaList[i].a[select[i]];   //data.js의 qna의 answer(사용자가 클릭)
        for(let j = 0; j<target.type.length; j++){  //target의 type => type: ['cow', 'tiger', 'dragon', 'chick']
            for(let k = 0; k<pointArray.length; k++){
                if(target.type[j] === pointArray[k].name){  
                    pointArray[k].value += 1;
                }   //data.js의 answer의 type과 pointArray의 name이 같다면 value를 +1
            }
        }
    }

    //pointArray를 value 기준으로 정렬
    var resultArray = pointArray.sort(function (a,b){
        if(a.value > b.value){
            return -1;
        }
        if(a.value < b.value){
            return 1;
        }
        return 0;
    });

    console.log(resultArray);
    let resultword = resultArray[0].key;    //pointArray의 key값
    return resultword;

    */
    console.log(select);
    //최대값을 갖는 배열의 인덱스 가져오기
    var result = select.indexOf(Math.max(...select));
    //Math.max() : 최대값 반환
    //...select : 전개구문, 선택한 배열 select를 펼치게 함

    return result;
}

function setResult(){
    let point = calResult();
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;    //infoList : data.js의 결과메시지 배열

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

function goResult(){
qna.style.WebkitAnimation = "fadeOut 1s";
qna.style.animation = "fadeOut 1s";
setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
    qna.style.display = "none";
    result.style.display = "block"
    }, 450)})

        //console.log(select);
        //콘솔에 지금까지 클릭한 answer(배열 select) 번호가 나타남 ex)0,1,2
        
        //calResult();    //사용자가 클릭한 값을 배열에 담고 정렬하는 함수 호출
        setResult();
}

function addAnswer(answerText, qIdx, idx){
  var a = document.querySelector('.answerBox');
  var answer = document.createElement('button');
  answer.classList.add('answerList');
  answer.classList.add('my-3');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');

    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener("click", function(){
        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++){
        children[i].disabled = true;
        children[i].style.WebkitAnimation = "fadeOut 0.5s";
        children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(() => {
            var target = qnaList[qIdx].a[idx].type;  //각 질문(qnaList[qIdx])의 사용자가 클릭한 선택지(a[idx])   
            for(let i = 0; i < target.length; i++){
                select[target[i]] += 1;
            }
            //select[qIdx] = idx; 알고리즘을 간단히 하기 위해 아래처럼 변경
           
            for(let i = 0; i < children.length; i++){
                children[i].style.display = 'none';
            }
            goNext(++qIdx); //다음 qna로 넘어감
        },450)
    }, false);
  }

function goNext(qIdx){
    if(qIdx === endPoint){
      goResult();
      return;
    }

    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;  //data.js의 배열 qnaList의 q(질문)를 순서대로 반환
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

function begin(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(() => {
      qna.style.WebkitAnimation = "fadeIn 1s";
      qna.style.animation = "fadeIn 1s";
      setTimeout(() => {
        main.style.display = "none";
        qna.style.display = "block"
      }, 450)
      let qIdx = 0;
      goNext(qIdx);
    }, 450);
  }