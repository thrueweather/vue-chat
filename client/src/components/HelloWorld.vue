<template>
  <div id="chat" class="chat">
    <div v-show="modalWindow" class="modal-log">
      <div class="modal-wrapp">
        <div style="color: white; font-size: 60px; margin-bottom: 10px;">
          <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
        </div>
        <form v-on:submit.prevent="closeModal">
          <input v-model="username" type="text" placeholder="Write your login...">
        </form>
      </div>
    </div>
    <div class="head-nav">
      <div class="logo-drop">
        <menu-icon style="margin-right: 20px;" class="custom-class"></menu-icon>
        <a>Messanger {{ count }}</a>
      </div>
      <div>
        <li
          v-for="(user, index) in users"
          :key="index"
          :user="user"
          style="list-style: none; color: white; display: inline; font-size: 18px;">
          {{ user }}
        </li>
        <user-icon style="color: white;" class="custom-class"></user-icon>
      </div>
    </div>
    <div class="wrapp-main">
      <div>
        <div style="max-height: 540px; overflow-y: scroll;">
          <div class="message" v-for="(m, index) in messages"
            :key="index"
            :index="index"
            :m="m"
            style="padding: 10px;">
            <p style="margin: 0">
              {{ m }}
            </p>
          </div>
        </div>
        <form>
          <input type="text" v-model="msg" autocomplete="off" placeholder="Write a message..."/>
          <button type="submit" v-on:click.prevent="msgSend"><send-icon class="custom-class"></send-icon></button>
        </form>
      </div>
    </div>
    <transition name="opacity">
      <div v-show="joinUser" class="join-window">
        <li
          v-for="(u, index) in userWindow"
          :key="index"
          :u="u"
          style="list-style: none; color: white; display: inline; font-size: 16px;">
          <h3>{{ u }}</h3>
        </li>
      </div>
    </transition>
  </div>
</template>

<script>
import { MenuIcon, MoreVerticalIcon, SendIcon, UserIcon } from 'vue-feather-icons'
import io from 'socket.io-client'
const socket = io('http://localhost:3001')
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'HelloWorld',
  data: () => ({
      msg: 'Welcome to Your Vue.js App',
      modalWindow: true,
      messages: [],
      msg: null,
      users: [],
      username: null,
      userWindow: [],
      joinUser: false,
      vuechat: false
  }),
  computed: {
    ...mapState([
      'count'
    ])
  },
  methods: {
      closeModal() {
        this.modalWindow = false;
        this.users.push(this.username);
        if(this.username.trim() !== '') {
          socket.emit('username', this.username);
        };
      },
      msgSend() {
        if(this.msg.trim() !== '') {
          socket.emit('chat message', this.username + ": " + this.msg);
        };
        this.msg = null;
      },
      ...mapMutations([
        'increment'
      ])
  },
  created() {
    socket.on('username', (user) => {
      setTimeout(() => {
        this.userWindow.push(user);
        this.joinUser = true;
      }, 1000);
      // setTimeout(() => {
      //   this.joinUser = false;
      //   this.userWindow.forEach(() => this.userWindow.shift());
      // }, 2500);
    });
    socket.on('chat message', (msg) => {
      setTimeout(() => {
        this.messages.push(msg)
      }, 200);
    });
  },
  components: {
    MenuIcon,
    MoreVerticalIcon,
    SendIcon,
    UserIcon
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat {
  background-color: white;
  width: 50%;
  margin: auto;
}
.head-nav {
  max-width: 1210px;
  margin: 0 auto;
  padding: 15px 20px;
  background: #28baf0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo-drop {
  color: white;
}
.logo-drop a {
  font-size: 18px;
  font-weight: 600;
}
.modal-log, .modal-wrapp {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.wrapp-main {
/*box-shadow: 0 1px 5px rgba(0,0,0,0.3);*/
}
.message {
  cursor: pointer;
  transition: .3s;
  margin: 10px 0 0 0;
}
.message:hover {
  background-color: #eee;
}
form {
  width: 100%;
  margin: 0 auto 0 auto;
  padding: 10px 0;
}
input {
  width: 88.6%;
  border-radius: 20px;
  padding: 12px 10px;
  border: 1px solid #eee;
  font-size: 16px;
  outline: none;
}
button {
  border: none;
  outline: none;
  border-radius: 50%;
  padding: 10px 16px 7px 14px;
  background-color: #28baf0;
  color: white;
  cursor: pointer;
}
.modal-log {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #28baf0;
  height: 100%;
  width: 100%;
  z-index: 100;
}
.join-window {
  background-color: #28baf0;
  padding: 20px;
  position: absolute;
  right: 2%;
  bottom: 5%;
  width: 300px;
}
.join-window h3 {
  font-weight: 500;
  margin: 0;
}
.opacity-enter-active, .opacity-leave-active {
  transition: opacity .3s;
}
.opacity-enter, .opacity-leave-to {
  transition: opacity .5s;
  opacity: 0;
}
</style>
