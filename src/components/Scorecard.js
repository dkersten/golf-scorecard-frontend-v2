import React, {useState} from 'react';

const Scorecard = () => {

    const [editing, setEditing] = useState(false)


    return(
        <div className="scorecard">
            <main>
                <div className="inner-container">
                    <div className="scorecard-options card">
                        Scorecard Options
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Scorecard