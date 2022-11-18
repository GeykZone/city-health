
<!-- Modal HTML -->
<style>
#delete_hp .modal-confirm .modal-content {
	padding: 20px;
	border-radius: 5px;
	border: none;
	text-align: center;
	font-size: 14px;
}
#delete_hp .modal-confirm .modal-header {
	border-bottom: none;   
	position: relative;
}
#delete_hp .modal-confirm h4 {
	text-align: center;
	font-size: 26px;
	margin: 30px 0 -10px;
}
#delete_hp .modal-confirm .close {
	position: absolute;
	top: -5px;
	right: -2px;
}
#delete_hp .modal-confirm .modal-body {
	color: #999;
}
#delete_hp .modal-confirm .modal-footer {
	border: none;
	text-align: center;		
	border-radius: 5px;
	font-size: 13px;
	padding: 10px 15px 25px;
}
#delete_hp .modal-confirm .modal-footer a {
	color: #999;
}		
#delete_hp .modal-confirm .icon-box {
	width: 80px; 
	height: 80px;
	margin: 0 auto;
	border-radius: 50%;
	z-index: 9;
	text-align: center;
	border: 3px solid #f15e5e;
}
#delete_hp .modal-confirm .icon-box i {
	color: #f15e5e;
	font-size: 46px;
	display: inline-block;
	margin-top: 13px;
}
#delete_hp .modal-confirm .btn, .modal-confirm .btn:active {
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
#delete_hp .modal-confirm .btn-secondary {
	background: #c1c1c1;
}
#delete_hp .modal-confirm .btn-secondary:hover, .modal-confirm .btn-secondary:focus {
	background: #a8a8a8;
}
#delete_hp .modal-confirm .btn-danger {
	background: #f15e5e;
}
#delete_hp .modal-confirm .btn-danger:hover, .modal-confirm .btn-danger:focus {
	background: #ee3535;
}

.close{
	display: none;
}
</style>

<div id="delete_hp" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog  modal-md modal-dialog-centered modal-confirm modal-dialog-scrollable">
		<div class="modal-content">
			<div class="modal-header flex-column">	
			<div class="icon-box shadow" style="background-color: #f15e5e;">
			<i class="fa-solid fa-head-side-cough-slash" style="font-size: 40px; margin-top:15px;  color:white;"></i> 
				</div>					
				<h4 class="modal-title w-100">Do you really want to move this record as inactive?</h4>	
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
				<p>Inactive health profiles are health profiles that are no longer referenced on a regular basis but must be kept for reference purposes.</p>
			</div>
			<div class="modal-footer justify-content-center">
				<button type="button" class="border-0 shadow-sm btn btn-secondary fw-bolder" data-coreui-dismiss="modal" aria-label="Close">Cancel</button>
				<button class="border-0 shadow-sm btn btn-danger fw-bolder" id="delete_hp_btn" data-coreui-dismiss="modal" aria-label="Close">Move</button>
			</div>
		</div>
	</div>
</div> 
