<template>
    <div>
        <input id="chooseImg" type="file" ref="image" @change="uploadImage"/>
    </div>

    <div>
        <img v-if="imageUrl" :src="imageUrl" />
    </div>
</template>

<script>
import { storage } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import 'firebase/storage';
import $ from 'jquery'

export default {
  data() {
    return {
      imageUrl: null,
      file: null,
    }
  },
  created() {
    const storage = getStorage();
    const storageRef = ref(storage, 'books/9780008283391.jpg');
    getDownloadURL(storageRef).then(url => {
        console.log('Download URL', url)
        this.imageUrl = url
    })
  },
  methods: {
    async uploadImage() {
        const file = this.$refs.image.files[0]
        const storage = getStorage();
        //var file = $("#chooseImg").val();
        if (!file) {
            console.log("No File Selected")
        } else {
            const storageRef = ref(storage, 'books/' + file.name);
            uploadBytes(storageRef, file).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });
        }
    }
  }
}
</script>


