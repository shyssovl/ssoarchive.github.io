        const canvas = document.getElementById('drawingCanvas');
        const ctx = canvas.getContext('2d');
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        const colorPicker = document.getElementById('colorPicker');
        const lineWidthSlider = document.getElementById('lineWidthSlider');
        const lineWidthValue = document.getElementById('lineWidthValue');

        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = lineWidthSlider.value;
        ctx.lineCap = 'round';

        const crayonImage = document.getElementById('crayonImage');
        const handImage = document.getElementById('handImage');

        // 컬러픽커로 크레용 색상 업데이트
        function updateCrayonColor(color) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = crayonImage.src;

        img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        ctx.globalCompositeOperation = 'source-atop';
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        crayonImage.src = canvas.toDataURL();
    };
    }

        updateCrayonColor(colorPicker.value);

        colorPicker.addEventListener('input', () => {
        ctx.strokeStyle = colorPicker.value;
        updateCrayonColor(colorPicker.value);
    });

        lineWidthSlider.addEventListener('input', () => {
        ctx.lineWidth = lineWidthSlider.value;
        lineWidthValue.textContent = lineWidthSlider.value;
    });

        canvas.addEventListener('mousedown', (event) => {
        isDrawing = true;
        lastX = event.offsetX;
        lastY = event.offsetY;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
    });

        canvas.addEventListener('mousemove', (event) => {
        if (isDrawing) {
        const currentX = event.offsetX + (Math.random() - 0.5) * 3; // X 좌표에 랜덤 노이즈 추가
        const currentY = event.offsetY + (Math.random() - 0.5) * 3; // Y 좌표에 랜덤 노이즈 추가

        ctx.quadraticCurveTo(lastX, lastY, (lastX + currentX) / 2, (lastY + currentY) / 2); // 부드러운 곡선
        ctx.stroke();

        lastX = currentX;
        lastY = currentY;
    }
    });

        canvas.addEventListener('mouseup', () => {
        isDrawing = false;
        ctx.closePath();
    });

        canvas.addEventListener('mouseleave', () => {
        isDrawing = false;
        ctx.closePath();
    });

        document.addEventListener('mousemove', (event) => {
        handImage.style.left = `${event.clientX}px`;
        handImage.style.top = `${event.clientY}px`;
        crayonImage.style.left = `${event.clientX}px`;
        crayonImage.style.top = `${event.clientY}px`;
    });

