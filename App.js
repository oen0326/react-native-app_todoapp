//필요한 것들을 import함. react, react-native는 앱을 생성하면 자동으로 생성됨.
import React from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage } from 'react-native';
import Header from './app/components/Header'
import SubTitle from './app/components/SubTitle'
import Input from './app/components/input'
import TodoItem from './app/components/Todo'

//App이라는 class를 만들고 export
export default class App extends React.Component {

  state = {
    inputValue: "",
    todos: [
      {
        todo: "이불개기",
        isComplete: false
      },
      {
        todo: "양치하기",
        isComplete: false
      }
    ]
  }

  componenetWillMount() {
    AsyncStorage.getItem('@todo:state').then((state) => {
      if(state != null) {
        this.setState(JSON.parse(state));
      }
    });
  }

  saveItem = () => {
    //state를 문자열로 바꿔서 저장함
    AsyncStorage.setItem('@todo:state', JSON.stringify(this.state)); //@앱이름:키이름
  }

  _makeTodoItem = ({ item, index }) => {
    return (
      <TodoItem
        text={item.todo}
        isComplete={item.isComplete}

        changeComplete={() => {
          const newTodo = [...this.state.todos];
          newTodo[index].isComplete = !newTodo[index].isComplete;
          this.setState({todos:newTodo}, this.saveItem);
        }}

        deleteItem={() => {
          const newTodo = [...this.state.todos];
          newTodo.splice(index,1);
          this.setState({todos:newTodo}, this.saveItem);
        }}/>
    );
  }

  _changeText = (value) => {
    this.setState({inputValue: value})
  }

  _addTodoItem = () => {
    if (this.state.inputValue != '') {
      const Input = this.state.inputValue;
      const prevTodo = this.state.todos;
      const newTodo = { todo: Input, isComplete: false}
      this.setState({
        inputValue:'',
        todos: prevTodo.concat(newTodo)
      }, this.saveItem);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.centered}>
          <Header/>
        </View>

        <View style={styles.inputContainer}>
          <SubTitle title="Todo 입력"/>
          <Input
            value={this.state.inputValue}
            changeText={this._changeText}
            addTodo={this._addTodoItem}/>
        </View>
        <View style={styles.todoContainer}>
          <SubTitle title="Todo List"/>
          <FlatList
            data={this.state.todos} //FlatList에서 렌더링할 데이터. 리스트!
            renderItem={this._makeTodoItem} //data리스트에 속한 하나의 데이터(할일 1개)를 바탕으로 컴포넌트를 리턴하는 함수
            keyExtractor={(item, index) => {return `${index}`}} //리스트의 각 할일 아이템에 고유의 key값을 생성해서 지정해줌. 각 할 일을 리스트 안에서 구분할 수 있게.
            />
        </View>
      </View>
    );
  }
}

//style을 설정
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 10
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5
  },
  inputContainer: {
    marginLeft: 20,
    borderWidth: 2
  },
  todoContainer: {
    marginTop: 20,
    marginLeft: 20,
    borderWidth: 4
  }
});