import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		role: "user", // Default role
	});
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			setMsg(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>

				<div className={styles.right}>

					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Thread & Thrift</h1>
						<h4>Create Account</h4>
						{/* Input for First Name */}
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						{/* Input for Last Name */}
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						{/* Input for Email */}
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						{/* Input for Password */}
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{/* Dropdown for Role */}
						<select
							name="role"
							onChange={handleChange}
							value={data.role}
							required
							className={styles.input}
						>
							<option value="admin">Admin</option>
							<option value="user">User</option>
						</select>
						{/* Error Message */}
						{error && <div className={styles.error_msg}>{error}</div>}
						{/* Success Message */}
						{msg && <div className={styles.success_msg}>{msg}</div>}
						{/* Submit Button */}
						<button type="submit" className={styles.green_btn}>
							Sing Up
						</button>
					</form>
					<div className={styles.welcome_text}>
						<p>Back to Login </p>
						<Link to="/login" className={styles.signin_link}>
							Sign In
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
