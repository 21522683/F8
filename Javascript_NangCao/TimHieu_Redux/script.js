// import { createStore } from 'https://cdn.skypack.dev/redux';

/////////////////////////// MY REDUX

function createStore (reducer) {
    let state = reducer(undefined, {})
    const arrs = [];
    return {
        getState() {
            return state;
        },
        dispatch(action) {
            state = reducer(state, action)
            for (var i = 0; i < arrs.length; i++) {
                arrs[i]()
            }
        },
        subscribe (sub) {
            arrs.push(sub)
        }
    }
}


/////////////////////////////////// REDUX //////////////////////////
const initState = 0;

function reducer (state = initState, action) {
    switch (action.type) {
        case 'DEPOSIT':
            return state + action.amount;
        case 'WITHDRAW': 
            return state - action.amount;
        default:
            return state;
    }
}

const store = createStore(reducer);

function actionDeposit(amount) {
    return {
        type: 'DEPOSIT',
        amount
    }
}

function actionWithdraw(amount) {
    return {
        type: 'WITHDRAW',
        amount
    }
}

const depositBtn = document.querySelector('#deposit')
const withdrawBtn = document.querySelector('#withdraw')

depositBtn.onclick = () => {
    store.dispatch(actionDeposit(10))
    render()
}
withdrawBtn.onclick = () => {
    store.dispatch(actionWithdraw(10))
    render()
}
store.subscribe(() => {
    render()
})
function render() {
    const output = document.querySelector('#output')
    output.innerText = store.getState()
}

render();