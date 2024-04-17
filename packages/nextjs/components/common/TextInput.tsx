const TextInput: React.FC<{
  value: string;
  setValue: any;
  isDisabled: boolean;
}> = ({ value, setValue, isDisabled }) => {
  return (
    <input
      type="text"
      id="permissionedUserIdForComputeSecret"
      value={value}
      onChange={e => setValue(e.target.value)}
      disabled={isDisabled}
      className={`mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
        isDisabled ? "cursor-not-allowed bg-gray-100" : "bg-white"
      }`}
    />
  );
};

export default TextInput;
