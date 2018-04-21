<template>
  <div>
    <div v-show="modalWindow" class="modal-log">
      <div class="modal-wrapp">
        <div style="color: white; font-size: 60px; margin-bottom: 10px;">
          <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
        </div>
        <form v-on:submit.prevent="closeModal" v-on:submit="increment">
          <input v-model="username" type="text" placeholder="Write your login...">
        </form>
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
        <ul v-for="(u, index) in userWindow"
            :key="index"
            :u="u"
            style="list-style: none; padding: 0; color: white; display: inline; font-size: 16px;">
          <li @click="userId">
            {{ u }}
          </li>
        </ul>
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
      username: null,
      userWindow: [],
      joinUser: true
  }),
  methods: {
      closeModal() {
        this.modalWindow = false;
        if(this.username.trim() !== '') {
          socket.emit('new user', this.username, function(data) {
            if(data) {
              this.modalWindow = true;
            } else {
              location.reload();
              alert('Enter another login');
            }
          });
        };
      },
      msgSend() {
        if(this.msg.trim() !== '') {
          socket.emit('chat message', this.msg);
        };
        this.msg = null;
      },
      userId() {
        socket.emit('private message', this.username);
      },
      ...mapMutations([
        'increment'
      ])
  },
  created() {
    socket.on('usernames', (data) => {
      this.userWindow.push(data);
      if(this.userWindow.length >= 2) {
        this.userWindow.shift(data);
      }
    });
    socket.on('chat message', (data) => {
      setTimeout(() => {
        this.messages.push(data);
      }, 200);
    });
    socket.on('whisper', (data) => {
      this.messages.push(data);
      console.log('whisper');
    })
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
