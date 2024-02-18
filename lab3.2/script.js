const checkDogs = function(dogsJulia, dogsKate) {
    // Bước 1: Tạo bản sao của mảng Julia và loại bỏ tuổi mèo
    const dogsJuliaCopy = dogsJulia.slice(1, -2);

    // Bước 2: Tạo mảng mới chứa dữ liệu của Julia (đã sửa) và Kate
    const allDogs = [...dogsJuliaCopy, ...dogsKate];

    // Bước 3: Kiểm tra từng con chó trong mảng
    allDogs.forEach(function(dogAge, i) {
        const dogType = dogAge >= 3 ? 'người lớn' : 'chó con';
        console.log(`Chó số ${i + 1} là ${dogType} và ${dogAge} tuổi`);
    });
};

// Test Data 1
const dogsJulia1 = [3, 5, 2, 12, 7];
const dogsKate1 = [4, 1, 15, 8, 3];
console.log('-- Test Data 1 --');
checkDogs(dogsJulia1, dogsKate1);

// Test Data 2
const dogsJulia2 = [9, 16, 6, 8, 3];
const dogsKate2 = [10, 5, 6, 1, 4];
console.log('-- Test Data 2 --');
checkDogs(dogsJulia2, dogsKate2);
