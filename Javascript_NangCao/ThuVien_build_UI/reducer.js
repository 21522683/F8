const initial_Value = {
    cars : ['BMW']
} // Giá trị ban đầu đc gán cho state 

export default  function reducer(state = initial_Value, action, args){
// 1 state ban đầu được gán thẳng giá trị = initial_Value
// 2 action là tham số khi nào chúng ta truyền vào thì vòng lặp switch sẽ kiểm tra và thực hiện
// 3 ...args là những tham số nhận theo kiểu Destructuring (bài này có ở JS cơ bản số 189 của anh Sơn)

    console.log(action, args);
    switch(action){   // Khi lần đầu chạy action chưa có giá trị nên nó chạy sẽ thằng default = state = initial_Value 
        case 'ADD': 
            const [newCar] = args
            return {
                ...state, 
                cars: [...state.cars, newCar]
            }

        default: 
            return state
    }
}