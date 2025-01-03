// src/utils/errorHandler.js

export const handleError = (error) => {
    if (error.response) {
        // 服务器返回的状态码不在2xx范围内
        const { code, message } = error.response.data;
        switch (code) {
            case 400:
                alert('请求参数错误');
                break;
            case 401:
                alert('未认证或认证失败');
                break;
            case 403:
                alert('无权限访问');
                break;
            case 404:
                alert('资源未找到');
                break;
            case 500:
                alert('服务器内部错误');
                break;
            case 1001:
                alert('用户名或密码不正确');
                break;
            // 其他错误码...
            default:
                alert(message || '未知错误');
        }
    } else if (error.request) {
        // 请求已发出但没有收到响应
        alert('网络错误，请稍后再试！');
    } else {
        // 其他错误
        alert(`Error: ${error.message}`);
    }
};
