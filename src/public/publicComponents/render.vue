<script>
    export default {
        props:[
            'propData'
        ],
        data(){
            return{
                testData:'i is fish'
            }
        },
        methods:{
            check(){
                console.log(this.testData)
            }, 
        },
        created(){
            console.log(this.propData)
        },
        render(createElement){
            const getChildrenTextContent =  children => children.map( node => node.children?getChildrenTextContent(node.children):node.text).join('');
            console.log(getChildrenTextContent(this.propData))
            return createElement(
                'div',
                {
                    style:{
                        color:'red'
                    },
                    on:{
                        click:this.check
                    }
                },
                getChildrenTextContent(this.propData),
            );
        }
    }
</script>