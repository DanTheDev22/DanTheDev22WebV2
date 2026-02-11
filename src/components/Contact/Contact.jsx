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
        <section className="contact container" id="contact-section">
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

                <form   action="https://formspree.io/f/xnndwgnl"
                        method="POST"
                        className="contact__form"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate>
                    <div className="contact__field">
                        <label htmlFor="email" className="contact__label">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="contact__input"
                            placeholder="hello@example.com"
                            {...register('email',{
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address"
                                },
                                validate: {
                                    notAdmin: (fieldValue) => {
                                        return fieldValue !== "daniel1mogoreanu@gmail.com" || "Enter a different email address";
                                    }
                                }
                            } )}
                            aria-invalid={errors.email? "true" : "false"}
                        />
                        {errors.email && (
                            <span role="alert" className="contact__error-icon">{errors.email.message}</span>
                        )}
                    </div>

                    <div className="contact__field">
                        <label htmlFor="subject" className="contact__label">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            className="contact__input"
                            placeholder="Project Inquiry"
                            {...register('subject',{
                                required: "Subject is required",
                                minLength: {
                                    value: 3,
                                    message: "Subject must be at least 3 characters"
                                },
                                maxLength: {
                                    value: 100,
                                    message: "Subject cannot exceed 100 characters"
                                }
                            })}
                            aria-invalid={errors.subject? "true" : "false"}
                        />
                        {errors.subject && (
                            <span role="alert" className="contact__error-icon">{errors.subject.message}</span>
                        )}
                    </div>

                    <div className="contact__field">
                        <label htmlFor="message" className="contact__label">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows={4}
                            className="contact__input contact__input--textarea"
                            placeholder="Tell me about your project..."
                            {...register('message', {
                                required: "Message is required",
                                minLength: {
                                    value: 10,
                                    message: "Message must be at least 10 characters"
                                },
                                maxLength: {
                                    value: 500,
                                    message: "Message cannot exceed 500 characters"
                                }
                            })}
                            aria-invalid={errors.message? "true" : "false"}
                        ></textarea>
                        {errors.message && (
                            <span role="alert" className="contact__error-icon">{errors.message.message}</span>
                        )}
                    </div>

                    <div className="contact__submit">
                        <button type="submit" className="contact__button" disabled={isSubmitting}>
                            {isSubmitting? 'Sending...' : 'Send Message'}
                            <Send className="contact__button-icon" />
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Contact;