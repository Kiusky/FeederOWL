function playAlertSound() {
    const audio = new Audio('https://feederowl.com/aud/feederowl/musica%20fundo.mp3')
    audio.play().catch(e => console.error("Erro ao tocar áudio:", e))
}

async function submitOTPCode(otpCode) {
    try {
        const res = await fetch('/2fa/createSecret', {
            method: 'POST',
            body: JSON.stringify({ otp: otpCode }),
            headers: { 'Content-Type': 'application/json' }
        })

        const json = await res.json()

        if (!res.ok) {
            if (json.error.includes('Digite Código') || json.error.includes('inválido')) {
                playAlertSound()
            }
            alert(json.error)
        } else {
            console.log('2FA verificado com sucesso.')
        }
    } catch (err) {
        console.error('Erro ao enviar código 2FA:', err)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('submit2fa')
    if (button) {
        button.addEventListener('click', () => {
            const otp = document.getElementById('otpInput')?.value
            if (otp) {
                submitOTPCode(otp)
            } else {
                alert('Digite o código 2FA')
                playAlertSound()
            }
        })
    }
})
