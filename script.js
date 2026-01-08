// 当网页完全加载后执行
window.onload = function() {
    
    // 1. 获取音乐元素和控制按钮
    const bgMusic = document.getElementById('bgMusic');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const volUpBtn = document.getElementById('volUpBtn');
    const volDownBtn = document.getElementById('volDownBtn');
    
    // 2. 设置初始音量（50%），避免一上来就太响
    bgMusic.volume = 0.5;
    
    // 3. 尝试自动播放（核心步骤！）
    // 注意：现代浏览器（如Chrome）为了用户体验，禁止未经用户交互的自动播放。
    // 这里的策略是：先加载音乐，然后尝试播放。如果失败，会显示提示，需要用户点击页面任意位置后播放。
    const playPromise = bgMusic.play();
    
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // 自动播放成功！
            console.log("音乐自动播放成功！");
        }).catch(error => {
            // 自动播放失败，通常是因为浏览器的策略
            console.log("自动播放被阻止，等待用户交互...");
            // 显示一个更友好的提示（可选，这里我们用一个简单的alert，你也可以修改成页面上的一个div提示）
            // alert("请点击页面任意位置，以激活音乐播放。");
            
            // 设置一个一次性点击事件：用户点击页面任何地方，就播放音乐
            document.body.addEventListener('click', function initAudio() {
                bgMusic.play();
                // 播放后移除这个事件监听器
                document.body.removeEventListener('click', initAudio);
            });
        });
    }
    
    // 4. 为按钮绑定点击事件
    playBtn.addEventListener('click', () => {
        bgMusic.play();
    });
    
    pauseBtn.addEventListener('click', () => {
        bgMusic.pause();
    });
    
    volUpBtn.addEventListener('click', () => {
        if(bgMusic.volume < 1) bgMusic.volume += 0.1;
        console.log(`音量增加至: ${bgMusic.volume.toFixed(2)}`);
    });
    
    volDownBtn.addEventListener('click', () => {
        if(bgMusic.volume > 0) bgMusic.volume -= 0.1;
        console.log(`音量减小至: ${bgMusic.volume.toFixed(2)}`);
    });
    
    // （可选）在控制台输出一些友好信息
    console.log("纪念日快乐！乖乖，享受你的音乐吧~");
};