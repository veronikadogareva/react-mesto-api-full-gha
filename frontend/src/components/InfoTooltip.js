import React from 'react';
import unionGood from '../images/Union_yes.svg';
import unionBad from '../images/Union_no.svg';
function InfoTooltip({ isOpen, onClose, massageError }) {

    return (
        <section className={`popup ${isOpen && 'popup_opened'}`} >
            <div className="popup__container popup__container_type_tooltip">
                <button className="popup__close" type="button" onClick={onClose} />
                {(massageError) ?
                    (<>
                        <img alt='Значок красного креста' src={unionBad} className='popup__image' />
                        <h2 className="popup__title popup__title_type_tooltip">Что-то пошло не так!<br />Попробуйте ещё раз.</h2>
                    </>) :
                    (<>
                        <img alt='Значок черной галочки' src={unionGood} className='popup__image' />
                        <h2 className="popup__title popup__title_type_tooltip">Вы успешно <br />зарегистрировались!</h2>
                    </>)}
            </div>
        </section>
    )
}
export default InfoTooltip;