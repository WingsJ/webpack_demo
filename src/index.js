import './main.css';
import './sass.scss';
import Logo from "../public/logo.png";
const a = 'HELLO WORLD';
console.log(a);

class Author {
    name = "豆瓣酱"
    age = 20
    email = "13123@163.com"
    info = () => {
        return {
            name:this.name,
            age:this.age,
            email:this.email
        }
    }
}

module.exports = Author