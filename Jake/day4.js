const DIMENSION = 5;


const data = ['17','25','31','22','79','72','58','47','62','50','30','91','11','63','66','83','33','75','44','18','56','81','32','46','93','13','41','65','14','95','19','38','8','35','52','7','12','70','84','23','4','42','90','60','6','40','97','16','27','86','5','48','54','64','29','67','26','89','99','53','34','0','57','3','92','37','59','9','21','78','51','80','73','82','76','28','88','96','45','69','98','1','2','71','68','49','36','15','55','39','87','77','74','94','61','85','10','43','20','24'];

const board = ['36','11','70','77','80','63','3','56','75','28','89','91','27','33','82','53','79','52','96','32','58','14','78','65','38'];


function getRow(board, rowNum) {
    const row = [];
    const offset = DIMENSION * rowNum;

    for (let i = offset; i < (rowNum + 1) * DIMENSION; i++) {
        row.push(board[i]);
    }

    return row;
}

function getColumn(board, colNum) {
    const column = [];
    const offset = colNum;

    for (let i = offset; i < offset + DIMENSION**2; i += DIMENSION) {
        column.push(board[i]);
    }

    return column;
}

function getDiagonal(board) {
    const diag = [];

    for (let i = 0; i <= DIMENSION**2; i += (DIMENSION + 1)) {
        diag.push(board[i]);
    }

    return diag;
}

function getOffDiagonal(board) {
    const offDiag = [];

    for (let i = DIMENSION - 1; i < DIMENSION**2 - 1; i += (DIMENSION - 1)) {
        offDiag.push(board[i]);
    }

    return offDiag;
}


function checkLine(line, calledNums) {
    let hits = 0;

    for (let i = 0; i < DIMENSION; i++) {
        hits += +calledNums.includes(line[i]);
    }
}





// console.log(`Col 1:`);
// console.log(getColumn(board, 1));

// console.log('Row 1:');
// console.log(getRow(board, 1));

// console.log('Diag:');
// console.log(getDiagonal(board));

// console.log('Off diagonal');
// console.log(getOffDiagonal(board));

function checkVertical(board) {}

function checkHorizontal(board) {}

function checkDiagonal(board) {}


function getNumMoves(board, data) {

}