---
title: "multer"
description: "Node.js에서 파일을 업로드하기 위해 사용되는 multipart/form-data를 다루기 위한 미들웨어이다."
date: 2021-09-07T05:22:27.486Z
tags: ["node.js"]
---
>## multer란??

Node.js에서 파일을 업로드하기 위해 사용되는 **multipart/form-data**를 다루기 위한 미들웨어이다. multipart가 아닌 폼에서는 동작하지 않는다.

> 설치 및 기본 설명서

```js
npm i multer
```

```js
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

var upload = multer({ storage: storage });
```
destination : 어디에 파일이 저장되는지를 얘기해준다.
filename : 해당 디렉터리 안에 파일이 저장될때 어떤 이름으로 저장될것인지 설정한다.

> ## 예시

<br />

```js
app.use(express.json());
app.use(express.urlencoded({extended: true}));
```

프론트서버와 백엔드 서버를 나누어서 프로젝트를 설계하고, axios를 사용한다고 가정하자. 
axios로 데이터를 보낼때는 json, 일반 form은 urlencoded로 받는다. 하지만 이미지 파일을 보면 encType="multipart/form-data" 으로 되어있다. multer을 사용하여 다루면 된다.

app.js에 장작할수도있지만 보통 사용하는 router에서 장착한다. 이미지, 이미지들, 텍스트 등등 상황에따라 multipart 처리하는것이 다르기 때문이다.

<br />

<img src="https://media.vlpt.us/images/bbio3o/post/ed9f0295-74be-46d1-bb32-4fbd19d72abe/Present%20with%20ease%20(2).jpg" />

<br />

* Front Server

```js
//PostForm.js
const PostForm = () => {
    const {imagePaths, addPostDone} = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const [text, onChangeText,setText] = useInput('');

    useEffect(() => {
        if(addPostDone){
            setText('');
        }
    }, [addPostDone]);

    const onSubmit = useCallback(() => {
        if(!text || !text.trim()){
            return alert('게시글을 작성하세요.');
        }
        const formData = new FormData();
        imagePaths.forEach((p) => {
            formData.append('image', p)
        });
        formData.append('content', text);
        dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
        });
    }, [text, imagePaths]);

    const imageInput = useRef();
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current])
    const onChangeImages = useCallback((e) => {
        console.log('images', e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
        });
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        });
    });

    return(
        <Form style={{margin: '10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea value={text} name="image" onChange={onChangeText} 
            placeholder="무슨일이 있었나요?" maxLength={140} />
            <div>
                <input type='file' multiple hidden ref={imageInput} onChange={onChangeImages}/>
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button style="primary" style={{float:'right'}} htmlType="submit">짹짹</Button>
            </div>
            <div>
                {imagePaths.map((v, i) => (
                    <div key={v} style={{display:'inline-block'}}>
                        <img src={`http://localhost:3065/${v}`} style={{width:'200px'}} alt={v} />
                        <div>
                            <Button onClick={onRemoveImage(i)}>제거</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Form>
    );
}

export default PostForm;
```
FormData는 multipart 형식으로 데이터를 보낼 수 있도록 해준다. append 뒤에있는 'image' 와 Back Server의 라우터에서 upload 뒤의 'image' 값이 같아야 제대로 동작한다.

위 코드는 게시물에 사진을 등록할때, 미리보기 기능을 구현하여 조금 복잡해보인다. imagePaths.map 부분에서 src를 위와같이 설정하여 미리보기 기능을 구현해주었다.

text만 보내주는것이아니라 이미지가있으면 이미지도 올려주어야한다.
single이면 req.file, array면 req.files, 그 외는 req.body에 들어간다.
이미지가 없으면 formData를 굳이 사용할 필요없다. 위의 코드처럼 json으로 넘겨서 사용해도된다.
하지만 multipart  배우는 입장에서 none을 사용해보기위해 위와같이 하지는 않았다.

<br />

```js
function uploadImagesAPI(data){
    return axios.post(`/post/images`, data);
}
```
폼 데이터가 현재 data에 들어가있을때, axios로 백엔드 router에 데이터를 보낼 경우 data를 {imagename:data} 처럼 감싸주면 안된다. 폼 데이터가 아닌 json이 되어버리기 때문이다.

<br />


* Back Server

```js
//routes post.js
try{
    fs.accessSync('uploads');
} catch(error){
    console.log('uploads 폴더가 없으므로 생성합니다.')
    fs.mkdirSync('uploads')
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads')
        },
        filename(req, file, done){ //이현호.png
            const ext = path.extname(file.originalname); //확장자 추출(.png)
            const basename = path.basename(file.originalname, ext); //이름 추출(이현호)
            done(null, basename + new Date().getTime() + ext); //이현호12346765.png
        }
    })
});
```
먼저 uploads 폴더를 생성하고, 여기에 multipart/form-data들을 저장하는것이 목적이다.

위의 예시에서 diskStorage는 하드디스크에 저장한다는 의미이다.

백엔드 서버가 요청을 많이받으면 스케일링을 해줘야 한다. 서버를 복사할때마다 이미지가 같이복사되어 넘어가면 안돼므로 하드웨어에 저장하는 방식은 사용하지말자.

파일 이름이 가끔 중복될때가 있다. 노드는 기존 파일을 덮어씌워버리기때문에 이것을 방지하기위해 업로드할때 파일명 뒤에 날짜 시간 초까지 적어주었다.

백엔드에서 처리하면 자원이 많이 소모되므로, 보통은 프론트에서 클라우드로 이미지나 동영상을 바로 제공하는게좋다.

<br />

```js
//routes post.js
router.post('/images', isLoggedIn, upload.array('image'),async(req, res, next) => {
    res.json(req.files.map((v) => v.filename));
});
```

* 방법1 : content와 image를 한번에 multipart 형식으로  보내줌 → 이미지 미리보기 기능 애매, 업로드 된 후에야 리사이징이나 보정 머신러닝 할수있음

* 방법2 : 처음에 image를 보내서 서버에 업로드해놓음. 파일명을(이현호.png) 리턴받음. 미리보기 리사이징 하는 동안에 사람들은 content를 작성할 수 있다.  → 오래걸리는것 미리 처리하고 content올릴 수 있음.

위 예시는 방법2로 설계하고있다.

<br />


<br /><br /><br /><br /><br /><br /><br />

[초보몽키](https://wayhome25.github.io/nodejs/2017/02/21/nodejs-15-file-upload/) [zerocho]