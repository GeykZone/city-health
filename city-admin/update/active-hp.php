
<!-- Modal HTML -->
<style>
.modal-confirm .modal-content {
	padding: 20px;
	border-radius: 5px;
	border: none;
	text-align: center;
	font-size: 14px;
}
.modal-confirm .modal-header {
	border-bottom: none;   
	position: relative;
}
.modal-confirm h4 {
	text-align: center;
	font-size: 26px;
	margin: 30px 0 -10px;
}
.modal-confirm .close {
	position: absolute;
	top: -5px;
	right: -2px;
}
.modal-confirm .modal-body {
	color: #999;
}
.modal-confirm .modal-footer {
	border: none;
	text-align: center;		
	border-radius: 5px;
	font-size: 13px;
	padding: 10px 15px 25px;
}
.modal-confirm .modal-footer a {
	color: #999;
}		
.modal-confirm .icon-box {
	width: 80px; 
	height: 80px;
	margin: 0 auto;
	border-radius: 50%;
	z-index: 9;
	text-align: center;
	border: 3px solid #4d8ae6;
}
.modal-confirm .icon-box i {
	color: #4d8ae6;
	font-size: 46px;
	display: inline-block;
	margin-top: 13px;
}
.modal-confirm .btn, .modal-confirm .btn:active {
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
.modal-confirm .btn-secondary {
	background: #c1c1c1;
}
.modal-confirm .btn-secondary:hover, .modal-confirm .btn-secondary:focus {
	background: #a8a8a8;
}
.modal-confirm .btn-danger {
	background: #ff4f4f;
}
.modal-confirm .btn-danger:hover, .modal-confirm .btn-danger:focus {
	background: #ea0000;
}

.modal-confirm .btn-react {
	background: #4d8ae6;
}
.modal-confirm .btn-react:hover, .modal-confirm .btn-danger:focus {
	background: #366bbb;
}


.close{
	display: none;
}
</style>

<div id="active_hp" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog  modal-md modal-dialog-centered modal-confirm modal-dialog-scrollable">
		<div class="modal-content">
			<div class="modal-header flex-column">	
			<div class="icon-box shadow" style="background-color: #4d8ae6;">
				<i class="fa-solid " style="font-size: 40px; margin-top:15px;  color:white;"></i>
				</div>					
				<h4 class="modal-title w-100">What would you like to do with this record?</h4>	
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
				<p>If you click "Reactivate", this record will be marked as active again. If you click "Delete", you will permanently remove this record.</p>
			</div>
			<div class="modal-footer justify-content-center">
				<button type="button" class="border-0 shadow-sm btn btn-secondary fw-bolder" data-coreui-dismiss="modal" aria-label="Close">Cancel</button>
				<button class="border-0 shadow-sm btn btn-react fw-bolder" id="active_hp_btn" data-coreui-dismiss="modal" aria-label="Close">Reactivate</button>
				<button class="border-0 shadow-sm btn btn-danger fw-bolder" id="delete_hp_btn_permanently" data-coreui-dismiss="modal" aria-label="Close">Delete</button>
			</div>
		</div>
	</div>
</div> 
