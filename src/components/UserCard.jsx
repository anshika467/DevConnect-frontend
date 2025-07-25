const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, photoUrl } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure className="aspect-[3/3] overflow-hidden">
        <img
          src={photoUrl}
          alt="Photo_User"
          className="w-full h-full object-cover p-4"
        />
      </figure>
      <div className="card-body flex justify-between">
        <div>
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + " , " + gender}</p>}
          <p>{about}</p>
        </div>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary">Ignored</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
