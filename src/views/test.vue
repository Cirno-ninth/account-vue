<template>
    <div>
        show--{{test.message}}-{{test.message2}}
    </div>    
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            test:'111'
        }
    },
    mounted(){
        axios({
            url:'http://localhost:8000/test/'
        }).then(res=>{
            console.log(res.data)
            this.test = res.data
        })
    }
}
</script>
