<script>
    jQuery(function () {
        var animate = setInterval(function () {
            window.controlProgress && (controlProgress.value += 10);
            if (!window.controlProgress || controlProgress.value >= controlProgress.max) {
                clearInterval(animate);
            }
        }, 1000);
    });
</script>
