'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'connectedCell' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY matrix as parameter.
 */

var markRegionArr = []; 
function connectedCell(matrix, n, m) {
    // create an array to store the region num
    for(var a=0; a<n; a++){
        var row=[];
        for(var b=0;b<m; b++){
            //default is 0
            row.push(0);
        }
        markRegionArr.push(row);
    }
    
    //region num starts from 1
    var newMarker = 1;
    for(var i=0; i<n; i++){
        for(var j=0; j<m;j++){
           if(matrix[i][j] == 1 && markRegionArr[i][j] == 0){
               //Call DP function to look up all connected cells 
               markRegion(matrix, i, j, newMarker);
               
               //refresh the region num for another region
               newMarker++;
           }
        }
    }
    
    //debug
    for(var d=0; d< markRegionArr.length; d++){
        var row = markRegionArr[d];
        console.log(row.toString());
    }
    
    //Find the large region
    var largeRegion=0;
    //region num starts from 1. 0 is not counted as region.
    for(var nM=1; nM<newMarker; nM++){
        var count = 0;
        for(var x=0; x<markRegionArr.length; x++){
            for(var y=0; y<markRegionArr[x].length; y++){
                if(markRegionArr[x][y] == nM){
                    count++;
                }
            }
        }
        largeRegion = largeRegion < count ? count : largeRegion
    }
    
    return largeRegion;
}

function markRegion(matrix, i, j, marker){
     
    markRegionArr[i][j]=marker;
    
    var m = matrix[0].length;
    var n = matrix.length;
    
    if(i>0 && j>0){
        if(markRegionArr[i-1][j-1] == 0 && matrix[i-1][j-1] ==1){
            markRegion(matrix, i-1, j-1, marker)
        }
    }
    if(i>0){
        if(markRegionArr[i-1][j] == 0 && matrix[i-1][j] ==1){
            markRegion(matrix, i-1, j, marker)
        }
    }
    if(j>0){
        if(markRegionArr[i][j-1] == 0 && matrix[i][j-1] ==1){
            markRegion(matrix, i, j-1, marker)
        }
    }
    if(i<n-1){
        if(markRegionArr[i+1][j] == 0 && matrix[i+1][j] ==1){
            markRegion(matrix, i+1, j, marker)
        }
    }
    if(j<m-1){
        //extra logging
        if(i==1 && j==3){
            console.log("markRegionArr[i][j+1]: " + markRegionArr[i][j+1]);
        }
        if(markRegionArr[i][j+1] == 0 && matrix[i][j+1] ==1){
            markRegion(matrix, i, j+1, marker)
        }
    }
    if(i<n-1 && j<m-1){
        if(markRegionArr[i+1][j+1] == 0 && matrix[i+1][j+1] ==1){
            markRegion(matrix, i+1, j+1, marker)
        }
    }
    if(i<n-1 && j>0){
        if(markRegionArr[i+1][j-1] == 0 && matrix[i+1][j-1] ==1){
            markRegion(matrix, i+1, j-1, marker)
        }
    }
    if(j<n-1 && i>0){
        if(markRegionArr[i-1][j+1] == 0 && matrix[i-1][j+1] ==1){
            markRegion(matrix, i-1, j+1, marker)
        }
    }       
}



function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const m = parseInt(readLine().trim(), 10);

    let matrix = Array(n);

    for (let i = 0; i < n; i++) {
        matrix[i] = readLine().replace(/\s+$/g, '').split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
    }

    const result = connectedCell(matrix, n, m);

    ws.write(result + '\n');

    ws.end();
}
