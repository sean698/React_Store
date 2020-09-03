import React from 'react';
import Header from 'components/Header';    // 使用绝对路径更改文件比较方便。 ./为相对路径， 在jsconfig.json里设置
import Products from 'components/Products';
import Layout from 'Layout';

const App = (props) => (
    <Layout>
        <Products />
    </Layout>
)


export default App;