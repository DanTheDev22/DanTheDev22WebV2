import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import './Contact.scss';

const Contact = () => {
    const [submitStatus, setSubmitStatus] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        defaultValues: {
            email: '',
            subject: '',
            message: ''
        }
    });

    const onSubmit = async (data) => {
        setSubmitStatus(null);

        try {
            const response = await fetch('https://formspree.io/f/xnndwgnl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setSubmitStatus('success');
                reset();
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error(error);
            setSubmitStatus('error');
        }
    };

    return (
        <section className="contact" id="contact-section">
            <div className="contact__container">
                <div className="contact__header">
                    <h2 className="contact__title">Let's work together</h2>
                    <p className="contact__subtitle">Have an idea? Let's turn it into reality.</p>
                </div>

                {submitStatus === 'success' && (
                    <div className="contact__success">
                        ✅ Message sent successfully!
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="contact__error">
                        ❌ Failed to send. Please try again.
                    </div>
                )}

                <form
                    className="contact__form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                </form>
            </div>
        </section>
    );
};

export default Contact;