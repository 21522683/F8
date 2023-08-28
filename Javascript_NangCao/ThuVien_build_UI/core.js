
// Thư viện này chỉ gồm 2 thành phần là 2 hàm (html()) và (createStore())

export default function html([first,...strings],...values){
    // tham số thứ nhất là: Tất cả chuỗi html
    // tham số thứ hai là: Tất cả cái nội suy trong đoạn html ta truyền vào 
    return values.reduce(
        (acc,cur)=> acc.concat(cur,strings.shift()), 
        [first]
    )
    .filter(x => x && x !== true || x ===0 )
    .join(''); 
}
// Hàm này giúp ta truyền vào 1 cái DOM HTML sẽ xuất ra 1 chuỗi
// bao gồm tất cả các giá trị nội suy na truyền trong DOM HTML thì nều thành chuỗi.

export function createStore(reducer){
    let state = reducer()  
    // state là dữ liệu mà ta muốn truyền vào Store sau khi đc hàm reducer() xử lý và trả về.

    const roots = new Map() // Vì Map() cũng là 1 dạng object nhưng có thể lặp qua, và trong Map 
    // mình có thể đặt key bằng bất cứ KDL gì chúng ta muốn thay vì chỉ có thể đặt key là chuỗi như object thông thường
    // ta đang muốn đặt key bằng một object nên ta dùng map().
 

    function render(){          
        // root đang chứa tât cả DOM html và component hay nói cách khác đang chứa tất cả các view
        // Hàm render() này sẽ lặp qua root , lặp qua tất cả các view để render ra giao diện người dùng

        // for này là 1 kiểu duyệt của Map, Hãy xem comment ví dụ bên dưới để hiểu 

        //              let map = new Map()

        //              map.set("one", "first element");
        //              map.set("two", "second element");
        //              map.set(3, "third element");

        //              for (let [key, value] of map) {
        //                  console.log(key + " = " + value);
        //              }
            
        //                  ---------- output ----------
        //                        one = first element
        //                        two = second element
        //                        3 = third element

        for(const[root, component] of roots){
            const output = component() // component() là một hàm trả về đoạn html , xem dòng 63
            root.innerHTML = output    // Đẩy view vào trong html 
        }
    }

    // hàm CreateStore sẽ trả về một object với những phương thức để thao tác với giao diện người dùng
    return {
        attach(component, root){         
            roots.set(root, component) // set key và value cho Map() cho root trong html => Sau đó render lại   
                render()                    
        },

        // Để hiện thị từ Store đến giao diện người dùng ta cần một cái conect 
        connect(selector = state => state){    
            return component => (props,...args) =>
            component(Object.assign({}, props, selector(state), ...args))   
        },
        dispatch(action, ...args){
            state = reducer(state, action, args)
            render()
        }
    }
}


// ==> ĐỂ SỬ DỤNG THƯ VIỆN NÀY TA CẦN TẠO RA 2 THẰNG LÀ store.js và reducer.js