const calcAverageHumanAge = function(ages) {
    // Bước 1: Tính tuổi của chó theo tuổi của người
    const dogHumanAges = ages.map(age =>
        age <= 2 ? age * 2 : 16 + age * 4
    );

    // Bước 2: Loại trừ những chú chó có tuổi dưới 18
    const adultDogAges = dogHumanAges.filter(age => age >= 18);

    // Bước 3: Tính tuổi trung bình của chó trưởng thành
    const averageHumanAge =
        adultDogAges.reduce((acc, age) => acc + age, 0) / adultDogAges.length;

    return averageHumanAge;
};

// Test Data 1
const ages1 = [5, 2, 4, 1, 15, 8, 3];
console.log('Average Human Age Test Data 1:', calcAverageHumanAge(ages1));

// Test Data 2
const ages2 = [16, 6, 10, 5, 6, 1, 4];
console.log('Average Human Age Test Data 2:', calcAverageHumanAge(ages2));
