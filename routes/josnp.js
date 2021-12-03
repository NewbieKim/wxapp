var b = "我是b"

// 调用cb函数，并以json数据形式作为参数传递
cb({
  code:200,
  msg:"success",
  data:{
    b: b
  }
})

function cb(arg0)
{
throw new Error("Function not implemented.")
}
