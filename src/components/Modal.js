import React from 'react'

const Modal = (props) => {

    const closeModal = (e) => {
        props.toggleModalFunc()
    }

    const renderParModal = () => {
        const btnArray = []
        for (let i = 3; i <= 5; i++) {
            btnArray.push(<button key={i} onClick={handleParClick} className="btn">{i}</button>)
        }

        return(
            <div>
                <h2>Hole's Par</h2>
                <div className="btn-container">
                    { btnArray }
                </div>
            </div>
        )
    }

    const handleParClick = (e) => {
        props.updateHoleParFunc(parseInt(e.target.textContent))
        props.toggleModalFunc()
    }

    const renderScoreModal = () => {

        const btnArray = []
        for (let i = 1; i <= 10; i++) {
            btnArray.push(<button key={i} onClick={handleScoreClick} className="btn">{i}</button>)
        }

        return(
            <div>
                <h2>Your Score</h2>
                <div className="btn-container">
                    { btnArray }
                </div>
            </div>
        )
    }

    const handleScoreClick = (e) => {
        // console.log(e.target.textContent)
        props.updateHoleScoreFunc(parseInt(e.target.textContent))
        props.toggleModalFunc()
    }

    return(
        <div className="modal">
            <div className="modal-content">
                <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h404c3.3 0 6 2.7 6 6v340zM356.5 194.6L295.1 256l61.4 61.4c4.6 4.6 4.6 12.1 0 16.8l-22.3 22.3c-4.6 4.6-12.1 4.6-16.8 0L256 295.1l-61.4 61.4c-4.6 4.6-12.1 4.6-16.8 0l-22.3-22.3c-4.6-4.6-4.6-12.1 0-16.8l61.4-61.4-61.4-61.4c-4.6-4.6-4.6-12.1 0-16.8l22.3-22.3c4.6-4.6 12.1-4.6 16.8 0l61.4 61.4 61.4-61.4c4.6-4.6 12.1-4.6 16.8 0l22.3 22.3c4.7 4.6 4.7 12.1 0 16.8z"/></svg>
                <section>
                    {
                        props.modalType === "par" && renderParModal()
                    }
                    {
                        props.modalType === "score" && renderScoreModal()
                    }
                </section>
            </div>
        </div>
    )
}

export default Modal