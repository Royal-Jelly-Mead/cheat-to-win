export function loadImagesToScene(images, scene) {
    Object.keys(images).forEach(name => {
        scene.load.image(name, images[name]);
    })
}

export default {
    loadImagesToScene
}