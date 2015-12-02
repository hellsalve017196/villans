app.controller('villanListCtrl',function($scope,$state,$stateParams,$cordovaSQLite) {
			query = "SELECT v_id,v_name,v_from,v_des FROM villans ORDER BY v_id DESC";

			data = [];

			$cordovaSQLite.execute(db,query,[]).then(function(res) {
				for(i=0;i<res.rows.length;i++)
				{
					data.push(res.rows.item(i));
				}

				$scope.data = data;
			},function(err) {
				alert("error occured:"+JSON.stringify(err));
			});


			$scope.delete = function(key) {
				query = "DELETE FROM villans WHERE v_id ="+key;

				$cordovaSQLite.execute(db,query,[]).then(function(res) {
					$state.go($state.current, {}, {reload: true});
				},function(err) {
					alert("error occured:"+JSON.stringify(err));
				});
			}
})

app.controller('villanDetailCtrl',function($scope,$stateParams) 
{
	 $scope.name = $stateParams.name;
	 $scope.from = $stateParams.from;
	 $scope.des = $stateParams.des;

})

app.controller('villaninertCtrl',function($scope,$state,$cordovaSQLite) {
	$scope.save = function() {
		query = "INSERT INTO villans(v_id,v_name,v_from,v_des) VALUES(?,?,?,?)";

		$cordovaSQLite.execute(db,query,[null,$scope.data.name,$scope.data.from,$scope.data.des]).then(function(res) {
			$scope.data.name = '';
			$scope.data.from = '';
			$scope.data.des = '';

			$state.go('page7');
		},function(err) {
			alert("error occured:"+JSON.stringify(err));
		});
	}
})

app.controller('villanEditCtrl',function($scope,$state,$stateParams,$cordovaSQLite) {
		key = $stateParams.id;
		$scope.data.name = $stateParams.name;
		$scope.data.from = $stateParams.from;
		$scope.data.des = $stateParams.des;

		$scope.edit = function() {
			query = "UPDATE villans SET v_name='"+$scope.data.name+"',v_from='"+$scope.data.from+"',v_des='"+$scope.data.des+"' WHERE v_id="+key;
			
			$cordovaSQLite.execute(db,query,[]).then(
				function(res) {
					$state.go("page7",{},{reload:true});
				},function(err) {
					alert("error occured:"+JSON.stringify(err));
				});
		}
})