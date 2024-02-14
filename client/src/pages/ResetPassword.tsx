import { useForm, SubmitHandler } from 'react-hook-form';
import { ResetPassInput } from '@/lib/types';
import { Input, Button, Loader } from '@/components';
import { resetPassword } from '@/app/actions/passwordActions';
import { emailValidator, showToast } from '@/lib/validators';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

const ResetPassword: React.FC = () => {
  const { register, handleSubmit } = useForm<ResetPassInput>();
  const { loading } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<ResetPassInput> = data => {
    const { error, status } = emailValidator(data.email);
    if (status === true) dispatch(resetPassword(data));
    else showToast(error, 'warning');
  };

  return (
    <div className="max-w-md mx-auto mt-24 bg-white p-8 rounded-md shadow-md">
      <div className="flex gap-4">
        <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
        {loading && <Loader classname="h-8 w-8" />}
      </div>
      <p className="text-gray-600 mb-6">
        You can change your password in easy steps by entering your email.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Email" type="email" name="email" register={register} />
        <Button children="Reset Password" type="submit" className="mb-6" />
      </form>
      <Button to="/login" children="Remember Your Password" type="button" />
    </div>
  );
};

export default ResetPassword;