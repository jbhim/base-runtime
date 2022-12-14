<script setup>
import { Parser } from 'expr-eval-boss'
import { computed, isRef, reactive } from 'vue'

let datasource1 = new Array(10000).fill(1).map((_, index) => {
    return { User: { id: index + 1, name: `test${ index }` } }
})
console.log(datasource1)
const source = reactive({
    in1: '222',
    buttonTextA: '新增',
    buttonTextD: '删除',
    buttonTextU: '修改',
    datasource1: datasource1
})


const parser = new Parser()

const computedMap = {
    'in1': computed(() => {
        console.log('in1', source)
        return parser.evaluate('in1', source)
    }),
    'buttonTextA': computed(() => {
        console.log('buttonTextA', source)
        return parser.evaluate('buttonTextA', source)
    }),
    'buttonTextU': computed(() => {
        console.log('buttonTextU', source)
        return parser.evaluate('buttonTextU', source)
    }),
    'buttonTextD': computed(() => {
        console.log('buttonTextD', source)
        return parser.evaluate('buttonTextD', source)
    }),
    'datasource1': computed(() => {
        console.log('datasource1', source)
        return parser.evaluate('datasource1', source)
    }),
    'datasource1[0].User.name.id': computed(() => {
        console.log('datasource1[0].User.name + in1', source)
        return parser.evaluate('datasource1[0].User.name + in1', source)
    })
}
const runExpressionNo = (expression) => {
    return isRef(computedMap[expression]) ? computedMap[expression].value : computedMap[expression]
}

let map = new Map()
const runExpression = (expression) => {
    if (map.has(expression)) {
        console.log('缓存命中')
        return map.get(expression)
    }
    let numberComputedRef = computed(() => {
        console.log(expression, source)
        return parser.evaluate(expression, source)
    })
    map.set(expression, numberComputedRef)
    return numberComputedRef
}
/*const runExpression = computed(() => {
    return (expression) => {
        console.log(expression, source)
        const result = parser.evaluate(expression, source)
        return result
    }
})*/

let count = source.datasource1.length + 1
const add = () => {
    count++
    source.datasource1.unshift({ User: { id: count, name: `test${ count }` } })
}

const update = (item) => {
    count++
    let find = source.datasource1.find(it => it.User === item.User)
    find.User.name = `Update-${ find.User.name }`
}

const deleteFunc = (item) => {
    let findIndex = source.datasource1.findIndex(it => it.User === item.User)
    source.datasource1.splice(findIndex, 1)
}

const updateIn = () => {
    source.in1 = `Update-${ source.in1 }`
}

</script>

<template>
    <div>
        <button @click="add">{{ runExpressionNo('buttonTextA') }}</button>
        <div>in1: {{ runExpressionNo('in1') }}
            <button @click="updateIn">修改《《《</button>
        </div>
        <div>{{ runExpressionNo('datasource1[0].User.name + In') }}</div>
    </div>

    <table>
        <h4>数据源：</h4>
        <tr>
            <td>id</td>
            <td>name</td>
        </tr>

        <tr v-for="(item, index) in runExpressionNo('datasource1')" :key="item.id">
            {{ index }}
            <td>{{ runExpression(`datasource1[${ index }].User.name`) }}</td>
            <td>{{ runExpression(`datasource1[${ index }].User.name`) }}</td>
            <td>
                <button @click="update(item)">{{ runExpressionNo('buttonTextU') }}</button>
            </td>
            <td>
                <button @click="deleteFunc(item)">{{ runExpressionNo('buttonTextD') }}</button>
            </td>
        </tr>
    </table>


</template>
<style scoped>
button {
    width: 80px;
    height: 45px;
}

table {
    border: 1px solid red;
}
</style>
