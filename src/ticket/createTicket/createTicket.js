import api from '../../api'
import './createTicket.css'
import { Form,Input,Textarea,Upload,Button,Radio } from 'tdesign-react';
import { useState,useEffect,useRef,useCallback } from 'react';
import {cos} from '../../cos'

const { FormItem } = Form;
const Bucket = window.sessionStorage.getItem('Bucket')
const Region = window.sessionStorage.getItem('Region')
export default function CreateTicket() {
    const formRef = useRef();
    const [ctgListValue, setCtgListValue] = useState([]);
    const user_id = window.sessionStorage.getItem('user_id')
    // 重置
    const onReset = (e) => {
        console.log(e);
    }
    // 提交表单
    const onSubmit = (e) => {
        if (e.validateResult === true) {
            let parma = formRef.current.getFieldsValue(true)
            let attachmentList = parma.attachment ? parma.attachment.map((item)=>`${user_id}_${item.uid}_${item.name}`): []
            parma.attachment = attachmentList.join(',')
            api.post('/admin/v1/ticket/create',parma).then((data)=>{               
                    api.dialog.alert({
                        title: '系统消息',
                        msg: '工单创建成功'                      
                    })
                    formRef.current.reset()
            }).catch((err)=>{
                    if(err.code === 1000) {
                        api.dialog.alert({
                            title: '系统消息',
                            msg: '工单创建失败'
                        })
                    } else if(err.code === 1004) {
                        api.dialog.alert({
                            title: '系统消息',
                            msg: '请勿重复提交'
                        })
                    } else if(err.code === 1005) {
                        api.dialog.alert({
                            title: '系统消息',
                            msg: '工单创建失败，该用户还未绑定房号'
                        })
                    }
                    
            })
        }
      };
    
    // form规则
    const rules = {
        title: [{ required: true, message: '必填', type: 'error' },{ min: 2, message: '至少需要两个字', type: 'error' },],
        content: [{ required: true, message: '必填', type: 'error' },{ min: 10, message: '至少需要十个字', type: 'error' },],
        attachment: [],
        category: [{ required: true, message: '必填', type: 'error' }]
    };
    // 分类
    const categoryGroup = ctgListValue.map((i)=>{
        return <Radio value={i.category_id} key={i.id}>{i.name}</Radio>
    })
    
        
    async function fetchCtgList() {
        try {  
            let {data} = await api.get('/admin/v1/ticket/category')
            setCtgListValue(data)
        } catch (err) {
            console.log('err',err)
            setCtgListValue([]); 
        }
    } 
    const uploadObj = useCallback((file) =>{
        return new Promise((resolve,reject)=>{
            let reader = new FileReader();
            reader.readAsDataURL(file.raw)
            reader.onload = ()=>{
                var body = dataURLtoBlob(reader.result)
                let name = user_id + '_' + file.uid + '_' + file.name
                cos.putObject({
                    Bucket: Bucket, /* 填入您自己的存储桶，必须字段 */
                    Region: Region,  /* 存储桶所在地域，例如ap-beijing，必须字段 */
                    Key: 'ticket/'+ name,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
                    StorageClass: 'STANDARD',
                    Body: body, // 上传文件对象
                    onProgress: function(progressData) {
                        console.log(JSON.stringify(progressData));
                    }
                }, function(err, data) {
                    if (data) {
                        resolve({
                            status: 'success',
                            response: {
                                url:file.url,
                                name: name
                            }
                        })
                    } else {
                        resolve({
                            status: 'fail',
                            error: '上传失败',
                        });
                    }
                })
            }
                
        })
    })
    function dataURLtoBlob(dataurl) {
        var arr = dataurl.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };
    useEffect(()=>{
        fetchCtgList();
    },[])
    return (
        <section className="ti-section-wrapper ti-create-wrapper" style={{height: '100%'}}>  
            <Form ref={formRef} colon={true} onSubmit={onSubmit} onReset={onReset} labelAlign='top' rules={rules}>  
                <div className="ti-form-basic-container">
                    <div className="ti-form-basic-item">
                        <div className="ti-form-basic-container-title">创建工单</div>
                        <FormItem label="标题" name="title">
                            <Input
                                placeholder="请输入内容"                         
                            />
                        </FormItem>
                        <FormItem label="内容" name="content">
                            <Textarea 
                                placeholder="请输入内容" 
                                maxlength={200}
                            />
                        </FormItem>
                        <FormItem label="附件" name="attachment" >
                            <Upload
                                requestMethod={uploadObj}
                                theme="image"
                                tips="允许选择多张图片文件上传，最多只能上传 3 张图片"
                                accept="image/*"
                                multiple
                                max={3}
                            />
                        </FormItem>
                        <FormItem label="分类" name="category">
                            <Radio.Group>
                                {categoryGroup}
                            </Radio.Group>
                        </FormItem>
                    </div>
                </div>
                <div className="ti-form-submit-container">
                    <div className="ti-form-submit-sub">
                        <Button type="submit" content="提交"></Button>
                        <Button type="reset" theme="default" content="取消" className="reset"></Button>
                    </div>
                </div>
            </Form>
        </section>
    )
}

