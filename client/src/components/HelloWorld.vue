<template>
  <div>
    <div class="container">
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
      <div class="wrapp-main">
        <div>
          <div class="wrapp-message">
            <transition-group name="opacity">  
              <div class="message" v-for="(m, index) in messages"
                :key="index"
                :index="index"
                :m="m"
                style="padding: 10px;">
                <div :title="msgTitle" style="">
                  {{ m.message }}
                  {{ m.private }}
                </div>
                <div style="color: rgb(184, 184, 184); font-weight: 300;">
                  {{ m.time }}
                  {{ m.prtime }}
                </div> 
              </div>
            </transition-group>
            <div v-show="typing">
              <div>
                {{ istyping }}
              </div>
            </div>
          </div>
          <form>
            <input type="text" v-model="msg" @input="eventInput" autocomplete="off" placeholder="Write a message..."/>
            <button type="submit" v-on:click.prevent="msgSend"><send-icon class="custom-class"></send-icon></button>
          </form>
        </div>
      </div>
    </div>
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
      msgTitle: '/p login private message',
      modalWindow: true,
      username: null,
      msg: "",
      messages: [
        {message: null, time: null},
        {private: null, prtime: null}
      ],
      typing: false,
      istyping: ''
  }),
  methods: {
      closeModal() {
        this.modalWindow = false;
        if(this.username.trim() !== "") {
          socket.emit('new user', this.username, (data) => {
            if(data) {
              this.modalWindow = true;
            } else {
              location.reload();
              alert('Enter another login');
            }
          });
        }
        else {
          location.reload();
          alert('Enter another login');
        }
      },
      msgSend() {
        if(this.msg.trim() !== "") {
          socket.emit('chat message', this.msg);
          socket.emit('stop typing', this.istyping);
        } else {
          this.msg = "";
        }  
        this.msg = "";    
      },
      eventInput() {
        if(this.msg.trim() !== "") {
          socket.emit('typing', this.typing);
        } 
      }
  },
  created() {
    socket.on('usernames', (data) => {
      this.messages.push({
        message: data
      });
    });
    socket.on('chat message', (data) => {
      setTimeout(() => {
        this.messages.push({
          message: data,
          time: (new Date).toLocaleTimeString()
        });
      }, 200);
    });
    socket.on('private message', (data) => {
      this.messages.push({
        private: data,
        prtime: (new Date).toLocaleTimeString()
      });  
    });
    socket.on('typing', (data) => {
      this.istyping = data;
      this.typing = true;
    });
    socket.on('stop typing', () => {
      this.typing = false;
      this.istyping = "";
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
.modal-log, .modal-wrapp {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.modal-wrapp form input {
  width: 89.9%;
}
.wrapp-message {
  height: 550px; 
  overflow-y: scroll;
}
.message {
  transition: .3s;
  margin: 10px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
.opacity-enter-active, .opacity-leave-active {
  transition: opacity .3s;
}
.opacity-enter, .opacity-leave-to {
  transition: opacity .5s;
  opacity: 0;
}
@media only screen and (max-width : 1199px) {}
@media only screen and (max-width : 991px) {
  form {
    text-align: center;
  }
  input {
    width: 50%;
  }
  .wrapp-message {
    height: 100%; 
    overflow-y: none;
  }
}
@media only screen and (max-width : 767px) {
  .wrapp-message {
    height: 100%; 
  }
}
@media only screen and (max-width : 480px) {}
</style>
