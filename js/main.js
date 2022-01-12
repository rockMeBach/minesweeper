document.addEventListener("DOMContentLoaded", function(event){

    const N = 10;
    let cellsClicked = 0;

    function createBoard(valid, bombs){
        let board = document.querySelector(".board");

        let validArr = new Array(valid).fill("valid");
        let bombsArr = new Array(bombs).fill("bomb");
        let totalArr = validArr.concat(bombsArr);
        totalArr.sort(()=>Math.random()-0.5);

        for(let i=1;i<=N*N;i++){
            let cell = document.createElement("DIV");

            cell.setAttribute("id", i);
            cell.setAttribute("data-type", totalArr[i-1]);
            //cell.innerHTML = i;
            cell.classList.add("cells");

            board.appendChild(cell);
        }

        return totalArr;
    }

    function showAllBombs(){
        let cells = document.getElementsByClassName("cells");
        Array.from(cells).forEach(function(cell){
            if(cell.dataset.type == "bomb") cell.setAttribute("style","background-color:red")
        })
    }

    let totalArr = createBoard(80,20);

    function findAdjMines(element){
        
        let elemId = parseInt(element.id);
        let t = elemId-N;
        let tl = t-1;
        let tr = t+1;
        let l = elemId-1;
        let r = elemId+1;
        let b = elemId+N;
        let bl = b-1;
        let br = b+1;
        let adjMines = 0;

        if(totalArr[elemId-1]=='bomb'){
            adjMines = -1;
        }else{
            if(elemId%N==1 && elemId!=N*N-N+1 && elemId!=1){
                //left cell
                if(totalArr[t-1] == 'bomb') adjMines++;
                if(totalArr[tr-1] == 'bomb') adjMines++;
                if(totalArr[b-1] == 'bomb') adjMines++;
                if(totalArr[br-1] == 'bomb') adjMines++;
                if(totalArr[r-1] == 'bomb') adjMines++;
            }else if(elemId%N==0 && elemId!=N && elemId!=N*N){
                //right cell
                if(totalArr[t-1] == 'bomb') adjMines++;
                if(totalArr[tl-1] == 'bomb') adjMines++;
                if(totalArr[b-1] == 'bomb') adjMines++;
                if(totalArr[bl-1] == 'bomb') adjMines++;
                if(totalArr[l-1] == 'bomb') adjMines++;
            }else if(elemId>1 && elemId<N){
                //top cell
                if(totalArr[br-1] == 'bomb') adjMines++;
                if(totalArr[b-1] == 'bomb') adjMines++;
                if(totalArr[bl-1] == 'bomb') adjMines++;
                if(totalArr[r-1] == 'bomb') adjMines++;
                if(totalArr[l-1] == 'bomb') adjMines++;
            }else if(elemId>N*N-N+1 && elemId<N*N){
                //bottom cell
                if(totalArr[t-1] == 'bomb') adjMines++;
                if(totalArr[tl-1] == 'bomb') adjMines++;
                if(totalArr[tr-1] == 'bomb') adjMines++;
                if(totalArr[l-1] == 'bomb') adjMines++;
                if(totalArr[r-1] == 'bomb') adjMines++;
            }else if(elemId==1){
                //tl cell
                if(totalArr[b-1] == 'bomb') adjMines++;
                if(totalArr[br-1] == 'bomb') adjMines++;
                if(totalArr[r-1] == 'bomb') adjMines++;
            }else if(elemId==N){
                //tr cell
                if(totalArr[b-1] == 'bomb') adjMines++;
                if(totalArr[bl-1] == 'bomb') adjMines++;
                if(totalArr[l-1] == 'bomb') adjMines++;
            }else if(elemId==N*N-N+1){
                //bl cell
                if(totalArr[t-1] == 'bomb') adjMines++;
                if(totalArr[tr-1] == 'bomb') adjMines++;
                if(totalArr[r-1] == 'bomb') adjMines++;
            }else if(elemId==N*N){
                //br cell
                if(totalArr[t-1] == 'bomb') adjMines++;
                if(totalArr[tl-1] == 'bomb') adjMines++;
                if(totalArr[l-1] == 'bomb') adjMines++;
            }else{
                //middle cells
                if(totalArr[br-1] == 'bomb') adjMines++;
                if(totalArr[b-1] == 'bomb') adjMines++;
                if(totalArr[bl-1] == 'bomb') adjMines++;
                if(totalArr[r-1] == 'bomb') adjMines++;
                if(totalArr[l-1] == 'bomb') adjMines++;
                if(totalArr[tr-1] == 'bomb') adjMines++;
                if(totalArr[tl-1] == 'bomb') adjMines++;
                if(totalArr[t-1] == 'bomb') adjMines++;
            }
        }

        return adjMines;
    }

    function blastCells(element){
        
        //counter to keep track of grayed out cells
        cellsClicked++;

        let adjMines = findAdjMines(element);
        let elemId = parseInt(element.id);

        let t = document.getElementById(elemId-N);
        let tl = document.getElementById(elemId-N-1);
        let tr =  document.getElementById(elemId-N+1);
        let l =  document.getElementById(elemId-1);
        let r =  document.getElementById(elemId+1);
        let b =  document.getElementById(elemId+N);
        let bl =  document.getElementById(elemId+N-1);
        let br =  document.getElementById(elemId+N+1);

        let isClicked = (element.getAttribute("style")!=null);

        element.setAttribute("style","background-color:silver")
        element.innerHTML = "<div style=\"transform: translateY(50%);\">"+((adjMines!=0)?adjMines:"")+"</div>";

        //if this cell is already clicked decrease cellsClicked
        if(isClicked){
            cellsClicked--;
        }

        //if it is a bomb or there is a bomb in any adjacent cell
        if(adjMines==-1 || adjMines!=0 || isClicked){
            return;
        }
        

        if(elemId%N==1 && elemId!=N*N-N+1 && elemId!=1){
            //left cell
            blastCells(t)
            blastCells(tr)
            blastCells(b)
            blastCells(br)
            blastCells(r)
        }else if(elemId%N==0 && elemId!=N && elemId!=N*N){
            //right cell
            blastCells(t)
            blastCells(tl)
            blastCells(b)
            blastCells(bl)
            blastCells(l)
        }else if(elemId>1 && elemId<N){
            //top cell
            blastCells(br)
            blastCells(b)
            blastCells(bl)
            blastCells(r)
            blastCells(l)
        }else if(elemId>N*N-N+1 && elemId<N*N){
            //bottom cell
            blastCells(tr)
            blastCells(t)
            blastCells(tl)
            blastCells(r)
            blastCells(l)
        }else if(elemId==1){
            //tl cell
            blastCells(br)
            blastCells(b)
            blastCells(r)
        }else if(elemId==N){
            //tr cell
            blastCells(bl)
            blastCells(b)
            blastCells(l)
        }else if(elemId==N*N-N+1){
            //bl cell
            blastCells(t)
            blastCells(tr)
            blastCells(r)
        }else if(elemId==N*N){
            //br cell
            blastCells(t)
            blastCells(tl)
            blastCells(l)
        }else{
            //middle cells
            blastCells(t)
            blastCells(bl)
            blastCells(b)
            blastCells(tr)
            blastCells(tl)
            blastCells(br)
            blastCells(r)
            blastCells(l)
        }
        
    }

    document.addEventListener("click", function(e){
        if(e.target && e.target.className=="cells"){
            let cell = e.target;
            switch(cell.dataset.type){
                case "bomb":
                    showAllBombs();
                    setTimeout(()=>{alert("YOU LOSE!"); window.location.reload();}, 500);
                    break;
                default:
                    blastCells(cell);
                    if(cellsClicked==80) alert("YOU WON!");
            }
        }
    });
    
});