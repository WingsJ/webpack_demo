import './main.css';
import './sass.scss';
import Logo from "../public/logo.png";
const a = 'HELLO WORLD';
console.log(a);

// 新增装饰器的使用
@log('hi')
class MyClass { }

function log(text) {
  return function(target) {
    target.prototype.logger = () => `${text}，${target.name}`
  }
}

const test = new MyClass()
test.logger()

// class Author {
//     name = "豆瓣酱"
//     age = 20
//     email = "13123@163.com"
//     info = () => {
//         return {
//             name:this.name,
//             age:this.age,
//             email:this.email
//         }
//     }
// }

// module.exports = Author