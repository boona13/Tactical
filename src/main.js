import {
    bootstrapCameraKit,
    createMediaStreamSource,
    Transform2D,
} from '@snap/camera-kit';

(async function(){
    var cameraKit = await bootstrapCameraKit({apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNjk3MTE4OTAzLCJzdWIiOiJmYmFiNDFjOC1iMjJjLTRlOTgtODA1MS0zZmFiMDAxNmI5MWV-U1RBR0lOR34yNDFhNTg4Ny0yYjk5LTQxYjEtOTYzZC0yOTRlNzBjZTIyMDgifQ.cb3i0dML8SG1lIrt06Mk6cpNnkM4XOE3mYJZuNbmvZs'})

    const session = cameraKit.createSession()
    document.getElementById('canvas').replaceWith((await session).output.live)

    const {lenses} = await cameraKit.lensRepository.loadLensGroups(['770d5a10-0228-47b4-b2d6-7f79743d8387'])

    session.applyLens(lenses[0])

    let mediaStream = await navigator.mediaDevices.getUserMedia({video: {
        facingMode: 'environment'
    }});
    const source = createMediaStreamSource(mediaStream,{

        cameraType: 'back'
    })

    await session.setSource(source)
    session.source.setRenderSize(window.innerWidth,window.innerHeight)

    session.play()

})();