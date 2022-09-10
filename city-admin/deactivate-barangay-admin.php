
<!-- Modal HTML -->
<style>
#deactivate_barangay_admin .modal-confirm .modal-content {
	padding: 20px;
	border-radius: 5px;
	border: none;
	text-align: center;
	font-size: 14px;
}
#deactivate_barangay_admin .modal-confirm .modal-header {
	border-bottom: none;   
	position: relative;
}
#deactivate_barangay_admin .modal-confirm h4 {
	text-align: center;
	font-size: 26px;
	margin: 30px 0 -10px;
}
#deactivate_barangay_admin .modal-confirm .close {
	position: absolute;
	top: -5px;
	right: -2px;
}
#deactivate_barangay_admin .modal-confirm .modal-body {
	color: #999;
}
#deactivate_barangay_admin .modal-confirm .modal-footer {
	border: none;
	text-align: center;		
	border-radius: 5px;
	font-size: 13px;
	padding: 10px 15px 25px;
}
#deactivate_barangay_admin .modal-confirm .modal-footer a {
	color: #999;
}		
#deactivate_barangay_admin .modal-confirm .icon-box {
	width: 80px; 
	height: 80px;
	margin: 0 auto;
	border-radius: 50%;
	z-index: 9;
	text-align: center;
	border: 3px solid #f15e5e;
}
#deactivate_barangay_admin .modal-confirm .icon-box i {
	color: #f15e5e;
	font-size: 46px;
	display: inline-block;
	margin-top: 13px;
}
#deactivate_barangay_admin .modal-confirm .btn, .modal-confirm .btn:active {
	color: #fff;
	border-radius: 4px;
	background: #60c7c1;
	text-decoration: none;
	transition: all 0.4s;
	line-height: normal;
	min-width: 120px;
	border: none;
	min-height: 40px;
	border-radius: 3px;
	margin: 0 5px;
}
#deactivate_barangay_admin .modal-confirm .btn-secondary {
	background: #c1c1c1;
}
#deactivate_barangay_admin .modal-confirm .btn-secondary:hover, .modal-confirm .btn-secondary:focus {
	background: #a8a8a8;
}
#deactivate_barangay_admin .modal-confirm .btn-danger {
	background: #f15e5e;
}
#deactivate_barangay_admin .modal-confirm .btn-danger:hover, .modal-confirm .btn-danger:focus {
	background: #ee3535;
}

.close{
	display: none;
}
</style>

<div id="deactivate_barangay_admin" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog  modal-md modal-dialog-centered modal-confirm modal-dialog-scrollable">
		<div class="modal-content">
			<div class="modal-header flex-column">	
			<div class="icon-box">
					<i class="material-icons">
                    <span class="material-symbols-outlined">
                    lock
                    </span>
                    </i>
				</div>					
				<h4 class="modal-title w-100">Are you sure?</h4>	
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
				<h5>Deactivating admin privileges prevents the user from accessing and modifying some records in this system.</h5>
			</div>
			<div class="modal-footer justify-content-center">
				<button type="button" class="btn btn-secondary fw-bolder" data-coreui-dismiss="modal" aria-label="Close">Cancel</button>
				<button class="btn btn-danger fw-bolder" id="deactivate_barangay_admin_record" data-coreui-dismiss="modal" aria-label="Close">Deactivate</button>
			</div>
		</div>
	</div>
</div> 
